export const iconWidth = 25;
export const marginSize = 7;
export const legendWidth = 300; // used for absolute positioning of islands

export const collisionRepulsionStrength = 0.5; // larger favors separation of islands
export const collisionRadiusFactor = 1; // larger favors separation of islands
export const clusterFactor = 1300; // larger favors separation of packages
export const manyBodyStrength = -0.1; // negative is repulsion, favors separation of islands
export const simIterations = 400; // larger favors "more accurate" simulation

export const fileNameSpace = 15;
export const randomColorArray = [
  "blue",
  "yellow",
  "green",
  "darkblue",
  "lightgreen",
  "brown",
  "pink",
];
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
export const tooltipScale = 1.5;
