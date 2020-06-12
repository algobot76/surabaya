import {
  JavaClass,
  JavaPackage,
  JavaProject,
  JavaFile,
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
} from "../util/constants";
import {
  getFullyQualifiedName,
  getApproximateIslandRadius,
} from "../util/helpers";
import { getIslandDimension } from "../components/Island";

/**
 * 1 JavaIsland represents 1 JavaFile
 */
export interface JavaIsland extends JavaFile, SimulationNodeDatum {
  package: JavaPackage;
  fullyQualifiedName: string;
  radius: number;
  center: {
    x: number;
    y: number;
  };
  topLeftCorner: {
    x: number;
    y: number;
  };
  publicClass: JavaClass;
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
  islandMap = new Map<string, JavaIsland>();
  links = {
    samePackage: new Array<SimulationLinkDatum<JavaIsland>>(),
    domesticDependencies: new Array<SimulationLinkDatum<JavaIsland>>(), // within a package
    foreignDependencies: new Array<SimulationLinkDatum<JavaIsland>>(), // between packages
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
  }

  private normalizePositions() {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    this.islands.forEach((island) => {
      minX = Math.min(minX, island.x);
      minY = Math.min(minY, island.y);
      maxX = Math.max(maxX, island.x);
      maxY = Math.max(maxY, island.y);
    });

    this.islands.forEach((island) => {
      island.x -= minX;
      island.y -= minY;
    });

    this.width = maxX - minX;
    this.height = maxY - minY;
  }

  private runSimulation() {
    const sim = forceSimulation<JavaIsland>(this.islands);
    sim.force("center", forceCenter());
    sim.force(
      "collision",
      forceCollide<JavaIsland>().radius((island) => island.radius)
    );
    sim.force(
      "manybody",
      forceManyBody<JavaIsland>().strength(manyBodyStrength)
    );
    sim.force(
      "samePackage",
      forceLink<JavaIsland, SimulationLinkDatum<JavaIsland>>(
        this.links.samePackage
      ).distance(islandInterpackageDistance)
    );
    sim.force(
      "domesticDependency",
      forceLink<JavaIsland, SimulationLinkDatum<JavaIsland>>(
        this.links.samePackage
      ).distance(islandInterpackageDistance)
    );
    sim.force(
      "foreignDependency",
      forceLink<JavaIsland, SimulationLinkDatum<JavaIsland>>(
        this.links.samePackage
      ).distance(islandInterpackageDistance)
    );
    sim.tick(simIterations);
    sim.stop();
  }

  private makeIntraPackageLinks() {
    this.project.packages.forEach((pkg) => {
      for (let i = 0; i < pkg.classes.length; ++i) {
        for (let j = i + 1; j < pkg.classes.length; ++j) {
          const sourceName = getFullyQualifiedName(
            pkg.name,
            pkg.classes[i].name
          );
          const targetName = getFullyQualifiedName(
            pkg.name,
            pkg.classes[j].name
          );
          const source = this.islandMap.get(sourceName);
          const target = this.islandMap.get(targetName);
          const link = { source, target };
          this.links.samePackage.push(link);
          source.links.samePackage.push(link);
          target.links.samePackage.push(link);
        }
      }
    });
  }

  private getDependencyIsland(receiverClass: JavaIsland, dependancy: string) {
    // look for island by simple name
    if (this.islandMap.has(dependancy)) {
      return this.islandMap.get(dependancy);
    }

    // look for island by fully qualified name
    for (const packageName of receiverClass.imports) {
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
      const link = { source, target };
      if (target.package === source.package) {
        this.links.domesticDependencies.push(link);
        source.links.domesticDependencies.asSource.push(link);
        target.links.domesticDependencies.asTarget.push(link);
      } else {
        this.links.foreignDependencies.push(link);
        source.links.foreignDependencies.asSource.push(link);
        target.links.foreignDependencies.asTarget.push(link);
      }
    }
  }

  private makeDependencyLinks() {
    this.project.packages.forEach((pkg) => {
      pkg.classes.forEach((cls) => {
        const target = this.islandMap.get(
          getFullyQualifiedName(pkg.name, cls.name)
        );
        cls.fields.forEach((field) => {
          this.processDependency(target, field.type);
        });
        cls.methods.forEach((method) => {
          method.parameters.forEach((param) => {
            this.processDependency(target, param.type);
          });
          this.processDependency(target, method.returnType);
        });
        cls.constructors.forEach((ctor) => {
          ctor.parameters.forEach((param) => {
            this.processDependency(target, param.type);
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

  private makeIsland(
    index: number,
    pkg: JavaPackage,
    file: JavaFile
  ): JavaIsland {
    const dimension = getIslandDimension();
    const fullyQualifiedName = getFullyQualifiedName(pkg.name, cls.name);
    return {
      ...file,
      index,
      package: pkg,
      radius,
      fullyQualifiedName,
      center: {
        x: undefined,
        y: undefined,
      },
      topLeftCorner: {
        x: undefined,
        y: undefined,
      },
    };
  }

  private initializeIslands() {
    let index = 0;
    this.islands = [];
    this.project.packages.forEach((pkg) => {
      pkg.files.forEach((file) => {
        this.islands.push(this.makeIsland(index, pkg, file));
        ++index;
      });
    });
  }
}
