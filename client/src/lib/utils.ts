export function getFullyQualifiedName(packageName: string, className: string) {
  return `${packageName}.${className}`;
}

export const IslandPadding = 50;
export const IslandMemberLength = 50;

/**
 * @returns not a whole number
 */
export function getApproximateIslandRadius(
  count: number,
  padding: number = IslandPadding,
  length: number = IslandMemberLength
): number {
  if (count === 0) {
    return padding;
  }
  return padding + count * length * Math.sqrt(count);
}
