import {
  JavaPackageImport,
  JavaPackageWithRadius,
  JavaProjectWithCoordinates,
} from "./getCoordinates";

export function forceDirectedGraph(
  imports: JavaPackageImport[],
  packages: JavaPackageWithRadius[]
): JavaProjectWithCoordinates {
  const result = {
    packages,
  } as JavaProjectWithCoordinates;
  // TODO

  return result;
}
