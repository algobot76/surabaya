export function getNumColumnsForSquare(numberItems) {
  let columns = 1;
  while (columns * columns < numberItems) {
    columns++;
  }
  return columns;
}
