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
