import { JavaProject, JavaPackage, JavaClass } from "../JavaProjectTypes";
import { forceDirectedGraph } from "./forceDirectedGraph";

const IslandPadding = 50; // pixels
const IslandObjectDimension = 50; // pixels
const IntraIslandDistance = 200;
const IntraPackageDistance = 700; // pixels
const LinearToCircleReductionFactor = 0.75;
const MarginOfErrorFactor = 1.5; // basically, a comfortable margin of error to prevent things from being too close

export type Coordinates = {
  x: number;
  y: number;
};

export type DirectedEdge = {
  from: Coordinates;
  to: Coordinates;
};

export interface JavaClassWithCoordinates extends JavaClassWithRadius {
  position: Coordinates;
}

export interface JavaPackageWithCoordinates extends JavaPackageWithRadius {
  position: Coordinates;
  classes: JavaClassWithCoordinates[];
}

export interface JavaProjectWithCoordinates extends JavaProjectWithSizing {
  packages: JavaPackageWithCoordinates[];
}

interface JavaClassWithRadius extends JavaClass {
  radius: number;
}

export interface JavaPackageWithRadius extends JavaPackage {
  radius: number;
  classes: JavaClassWithRadius[];
}

interface JavaProjectWithSizing extends JavaProject {
  packages: JavaPackageWithRadius[];
}

/**
 * @returns not a whole number
 */
function getApproximateIslandRadius(count: number): number {
  if (count === 0) {
    return IslandPadding;
  }
  return IslandPadding + IslandObjectDimension * Math.sqrt(count);
}

function sum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr);
}

function addSizing(javaProject: JavaProject) {
  javaProject.packages.forEach((javaPackage) => {
    const classMemberCounts = javaPackage.classes.map(
      (klass) =>
        klass.fields.length + klass.methods.length + klass.constructors.length
    );
    const approxIslandRadii = classMemberCounts.map(getApproximateIslandRadius);
    const approxTotalLinearSize =
      sum(approxIslandRadii) +
      IntraIslandDistance * (approxIslandRadii.length - 1); // All of the islands in a line rather than arrange approximately in a circle
    const approxPackageRadius =
      approxTotalLinearSize *
      LinearToCircleReductionFactor *
      MarginOfErrorFactor;
    // Assign this as the package's radius, which will be used in the force directed graph calculation
    (javaPackage as JavaPackageWithRadius).radius = approxPackageRadius;
    // Assign the island radii to classes for use later
    approxIslandRadii.forEach((radius, idx) => {
      (javaPackage.classes[idx] as JavaClassWithRadius).radius = radius;
    });
  });
}

export type JavaPackageImport = {
  from: {
    package: JavaPackageWithRadius;
    packageIdx: number;
  };
  to: {
    package: JavaPackageWithRadius;
    packageIdx: number;
    class: JavaClassWithRadius;
    classIdx: number;
  };
};

function getImports(packages: JavaPackageWithRadius[]): JavaPackageImport[] {
  // Create a mapping of package name to index (in packages arr)
  const packageNameToIdx: { [key: string]: number } = {};
  packages.forEach((pkg, idx) => {
    packageNameToIdx[pkg.name] = idx;
  });

  const imports: JavaPackageImport[] = [];
  packages.forEach((pkg, i) => {
    pkg.classes.forEach((cls, j) => {
      cls.imports.forEach((exporterName) => {
        const exporterIdx = packageNameToIdx[exporterName];
        const exporter = packages[exporterIdx];
        imports.push({
          from: {
            package: exporter,
            packageIdx: exporterIdx,
          },
          to: {
            package: pkg,
            packageIdx: i,
            class: cls,
            classIdx: j,
          },
        });
      });
    });
  });

  return imports;
}

/**
 * Adds position information to javaProject param and returns it.
 * Does not change any existing fields.
 *
 * Added fields:
 * - JavaProject (root) has additional fields:
 *   - Example:
 *
 * @param javaProject JavaProject JSON object as defined in README, which will be augmented with coordinates (and returned)
 * @returns JavaProjectAugmented object, which extends JavaProject, but has additional properties described above
 */
export function getJavaProjectWithCoordinates(
  javaProject: JavaProject
): JavaProjectWithCoordinates {
  addSizing(javaProject);
  const withRadii = javaProject.packages as JavaPackageWithRadius[];
  const imports = getImports(withRadii);
  // TODO make return easier to use
  return forceDirectedGraph(imports, withRadii);
}
