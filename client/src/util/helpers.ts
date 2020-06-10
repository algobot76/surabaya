import { marginSize, iconWidth } from "./constants";

export function getNumColumnsForSquare(numberItems) {
  let columns = 1;
  while (columns * columns < numberItems) {
    columns++;
  }
  return columns;
}

export function checkStringTypeIsCollection(type) {
  return /Collection<(.*)>|List<(.*)>|ArrayList<(.*)>|LinkedList<(.*)>|Vector<(.*)>|Stack<(.*)>|Queue<(.*)>|PriorityQueue<(.*)>|Dequeue<(.*)>|ArrayDeque<(.*)>|Set<(.*)>|HashSet<(.*)>|LinkedHashSet<(.*)>|SortedSet<(.*)>|TreeSet<(.*)>/.test(
    type
  );
}

export function getFullyQualifiedName(packageName: string, className: string) {
  return `${packageName}.${className}`;
}

/**
 * @returns not a whole number
 */
export function getApproximateIslandRadius(
  count: number,
  padding: number = marginSize,
  length: number = iconWidth
): number {
  if (count === 0) {
    return padding;
  }
  return padding + count * length * Math.sqrt(count);
}
