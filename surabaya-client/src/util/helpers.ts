import {
  marginSize,
  iconWidth,
  tooltipScale,
  collisionRadiusFactor,
} from "./constants";
import { JavaFile, JavaClass } from "../JavaProjectTypes";

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

function getNumberOfIcons(classData: JavaClass): number {
  let numberOfIcons = 0;

  classData["methods"]?.forEach(() => numberOfIcons++);
  classData["constructors"]?.forEach(() => numberOfIcons++);
  classData["fields"]?.forEach(() => numberOfIcons++);

  return numberOfIcons + 1;
}

// Used by Island.tsx
export function getTooltipWidth(fileData: JavaFile): number {
  const clusterNum = fileData.classes.length;
  let totalClusterWidth = 0;
  fileData.classes.forEach((c) => {
    const numberOfIcons = getNumberOfIcons(c);
    const numberHorizontal = getNumColumnsForSquare(numberOfIcons);
    const clusterWidth = numberHorizontal * iconWidth + marginSize * 2;
    totalClusterWidth = totalClusterWidth + clusterWidth;
  });
  const avgClusterWidth = totalClusterWidth / clusterNum;
  const numberOfClusters = fileData.classes.length;
  const columns = getNumColumnsForSquare(numberOfClusters);
  return avgClusterWidth * columns * tooltipScale;
}

function getTotalNumberOfLinesInFile(fileAnalysis: any): number {
  let numberOfLines = 0;
  fileAnalysis.classes.forEach((c) => {
    numberOfLines = numberOfLines + c["line_count"];
  });
  return numberOfLines;
}

// Used by JavaArchipelago and Island.tsx
export function getIslandWidth(javaFile: JavaFile): number {
  const numberOfLines = getTotalNumberOfLinesInFile(javaFile); // use this temporarily
  const minIslandWidth = getTooltipWidth(javaFile);

  // TODO max island width based on lines arbitrarily set to 400px
  const widthByLines = numberOfLines > 400 ? 400 : numberOfLines;

  // TODO 1px = 1 line is arbitrary, adjust as desired.
  return (
    (minIslandWidth > numberOfLines ? minIslandWidth : widthByLines) +
    marginSize
  );
}

// For collision boundary
export function getApproxRadiusFromWidth(width: number) {
  return width * collisionRadiusFactor;
}
