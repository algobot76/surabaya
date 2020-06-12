import {
  JavaClass,
  JavaPackage,
  JavaProject,
  JavaFile,
  JavaAccessModifier,
} from "../JavaProjectTypes";
import {
  SimulationNodeDatum,
  SimulationLinkDatum,
  forceSimulation,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
} from "d3-force";
import {
  manyBodyStrength,
  simIterations,
  islandInterpackageDistance,
  domesticIslandDistance,
} from "../util/constants";
import {
  getFullyQualifiedName,
  getIslandWidth,
  getApproxRadiusFromWidth,
} from "../util/helpers";

/**
 * 1 JavaIsland represents 1 JavaFile
 */
export interface JavaIsland extends JavaFile, SimulationNodeDatum {
  package: JavaPackage; // for convenience
  name: string; // name of public class, for convenience
  publicClass: JavaClass; // public class, for convenience
  otherClasses: JavaClass[]; // other classes, for convenience
  radius: number; // approximate. based on getIslandWidth and https://en.wikipedia.org/wiki/Squaring_the_circle
  width: number;
  fullyQualifiedName: string;
  center: {
    x: number;
    y: number;
  };
  topLeftCorner: {
    // based on getIslandWidth, and not radius. the y is 15 pixels higher due to 30-pixel name plate
    x: number;
    y: number;
  };
}

export interface Link extends SimulationLinkDatum<JavaIsland> {
  curveX?: number; // used in quadratic bezier path
  curveY?: number;
}

/**
 * ## Usage:
 * ```javascript
 * const javaArchipelago = new JavaArchipelago(javaProject);
 * ```
 */
export class JavaArchipelago {
  project: JavaProject;
  islands: JavaIsland[];
  islandMap = new Map<string, JavaIsland>(); // map of string to island
  links = {
    samePackage: new Array<Link>(),
    domesticDependencies: new Array<Link>(), // within a package
    foreignDependencies: new Array<Link>(), // between packages
  };
  width: number;
  height: number;

  constructor(project: JavaProject) {
    this.project = project;
    this.initializeIslands();
    this.makeIslandMap();
    this.makeIntraPackageLinks();
    this.makeDependencyLinks();
    this.runSimulation();
    this.normalizePositions();
    this.calculateCurves();
  }
  private calCurve(link: Link) {
    const source = link.source as JavaIsland;
    const target = link.target as JavaIsland;
    const sourceX = source.topLeftCorner.x;
    const sourceY = source.topLeftCorner.y;
    const targetX = target.topLeftCorner.x;
    const targetY = target.topLeftCorner.y;
    let deltaX = Math.random() * 400 - 200;
    let deltaY = Math.random() * 400 - 200;

    link.curveX = Math.round((sourceX + targetX) / 2 + deltaX);
    link.curveY = Math.round((sourceY + targetY) / 2 + deltaY);
  }
  private calculateCurves() {
    for (const link of this.links.domesticDependencies) {
      this.calCurve(link);
    }
    for (const link of this.links.foreignDependencies) {
      this.calCurve(link);
    }
  }

  private normalizePositions() {
    const padding = 50;
    const heightAdjustment = 15;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    this.islands.forEach((island) => {
      minX = Math.min(minX, island.x - island.width / 2);
      minY = Math.min(minY, island.y - island.width / 2 - heightAdjustment);
      maxX = Math.max(maxX, island.x + island.width / 2);
      maxY = Math.max(maxY, island.y + island.width / 2 - heightAdjustment);
    });

    minX = Math.round(minX) - padding;
    minY = Math.round(minY) - padding;
    maxX = Math.round(maxX) + padding;
    maxY = Math.round(maxY) + padding;

    this.islands.forEach((island) => {
      island.x -= minX;
      island.y -= minY;
      island.center.x = Math.round(island.x);
      island.center.y = Math.round(island.y);
      island.topLeftCorner.x = Math.round(island.x - island.width / 2);
      island.topLeftCorner.y = Math.round(
        island.y - island.width / 2 - heightAdjustment
      );
    });

    // Grand total width and height of "canvas"
    this.width = maxX - minX;
    this.height = maxY - minY;
  }

  private linkDistance(distance: number) {
    return function (link: SimulationLinkDatum<JavaIsland>) {
      return (
        (link.source as JavaIsland).radius +
        distance +
        (link.target as JavaIsland).radius
      );
    };
  }

  private runSimulation() {
    // Set up simulation
    const sim = forceSimulation<JavaIsland>(this.islands);

    // Ensure nothing strays too far
    sim.force("center", forceCenter());

    // Use radius for collision
    sim.force(
      "collision",
      forceCollide<JavaIsland>().radius((island) => island.radius)
    );

    // General repulsion force between islands
    sim.force(
      "manybody",
      forceManyBody<JavaIsland>().strength(manyBodyStrength)
    );

    // Attraction between islands through dependencies
    sim.force(
      "samePackage",
      forceLink<JavaIsland, SimulationLinkDatum<JavaIsland>>(
        this.links.samePackage
      ).distance(this.linkDistance(domesticIslandDistance))
    );

    sim.force(
      "domesticDependency",
      forceLink<JavaIsland, SimulationLinkDatum<JavaIsland>>(
        this.links.samePackage
      ).distance(this.linkDistance(domesticIslandDistance))
    );
    sim.force(
      "foreignDependency",
      forceLink<JavaIsland, SimulationLinkDatum<JavaIsland>>(
        this.links.samePackage
      ).distance(this.linkDistance(islandInterpackageDistance))
    );

    // Run simulations
    sim.tick(simIterations);
    sim.stop();
  }

  private makeIntraPackageLinks() {
    Object.keys(this.project.packages).forEach((pkgName) => {
      const pkg = {
        name: pkgName,
        files: this.project.packages[pkgName].files,
      };
      for (let i = 0; i < pkg.files.length; ++i) {
        const sourceClass = this.getPublicClass(pkg.files[i]);
        if (!sourceClass) {
          continue;
        }
        const sourceName = getFullyQualifiedName(pkg.name, sourceClass.name);
        const source = this.islandMap.get(sourceName);
        for (let j = i + 1; j < pkg.files.length; ++j) {
          const targetClass = this.getPublicClass(pkg.files[j]);
          if (!targetClass) {
            continue;
          }
          const targetName = getFullyQualifiedName(pkg.name, targetClass.name);
          const target = this.islandMap.get(targetName);
          const link = { source, target };
          this.links.samePackage.push(link);
        }
      }
    });
  }

  private getDependencyIsland(receiverIsland: JavaIsland, dependancy: string) {
    // look for island by simple name
    if (this.islandMap.has(dependancy)) {
      return this.islandMap.get(dependancy);
    }

    // look for island by fully qualified name
    for (const packageName of receiverIsland.imports) {
      const fullyQualifiedName = getFullyQualifiedName(packageName, dependancy);
      if (this.islandMap.has(fullyQualifiedName)) {
        return this.islandMap.get(fullyQualifiedName);
      }
    }

    return "not found";
  }

  private processDependency(target: JavaIsland, dependencyType: string) {
    const source = this.getDependencyIsland(target, dependencyType);
    if (source !== "not found") {
      // Skip self references
      if (source.fullyQualifiedName === target.fullyQualifiedName) {
        return;
      }

      const link = { source, target };

      // Create domestic or foreign reference depending on if they're from the same package
      if (target.package === source.package) {
        this.links.domesticDependencies.push(link);
      } else {
        this.links.foreignDependencies.push(link);
      }
    }
  }

  private makeDependencyLinks() {
    this.islands.forEach((island) => {
      island.classes.forEach((cls) => {
        cls.fields.forEach((field) => {
          this.processDependency(island, field.type);
        });
        cls.methods.forEach((method) => {
          method.parameters.forEach((param) => {
            this.processDependency(island, param.type);
          });
          this.processDependency(island, method.returnType);
        });
        cls.constructors.forEach((ctor) => {
          ctor.parameters.forEach((param) => {
            this.processDependency(island, param.type);
          });
        });
      });
    });
  }

  private makeIslandMap() {
    const conflictedClassNames: { [key: string]: boolean } = {};
    this.islands.forEach((island) => {
      // add to islandMap by fully qualified name
      this.islandMap.set(island.fullyQualifiedName, island);
      // add to islandMap by short class name but note if there is a conflict
      if (this.islandMap.has(island.name)) {
        conflictedClassNames[island.name] = true;
      } else {
        this.islandMap.set(island.name, island);
      }
    });
    // Remove conflicted short class names from the short class map
    Object.keys(conflictedClassNames).forEach((name) => {
      this.islandMap.delete(name);
    });
    // Every fully qualified class will still exist in the map
  }

  private getPublicClass(file: JavaFile) {
    return file.classes.find(
      (cls) => cls.access_modifier === JavaAccessModifier.Public
    );
  }

  private makeIsland(
    index: number,
    pkg: JavaPackage,
    file: JavaFile
  ): JavaIsland | "empty" {
    const publicClass = this.getPublicClass(file);
    console.log(publicClass);

    if (!publicClass) {
      return "empty";
    }

    const width = getIslandWidth(file);
    const radius = getApproxRadiusFromWidth(width);
    const otherClasses = file.classes.filter((cls) => cls !== publicClass);

    const fullyQualifiedName = getFullyQualifiedName(
      pkg.name,
      publicClass.name
    );
    return {
      ...file,
      index,
      package: pkg,
      publicClass,
      otherClasses,
      name: publicClass.name,
      fullyQualifiedName,
      radius,
      width,
      center: {
        x: 0,
        y: 0,
      },
      topLeftCorner: {
        x: 0,
        y: 0,
      },
    };
  }

  private initializeIslands() {
    let index = 0;
    this.islands = [];
    Object.keys(this.project.packages).forEach((pkgName) => {
      const pkg = {
        name: pkgName,
        files: this.project.packages[pkgName].files,
      };

      pkg.files.forEach((file: JavaFile) => {
        const island = this.makeIsland(index, pkg, file);
        if (island !== "empty") {
          this.islands.push(island);
          ++index;
        }
      });
    });
  }
}
