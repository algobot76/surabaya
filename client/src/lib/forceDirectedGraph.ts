import {
  JavaPackageImport,
  JavaPackageWithRadius,
  JavaProjectWithCoordinates,
} from "./getCoordinates";

const Iterations = 1000;
const AttractConstant = 0.0005;
const RepelConstant = 0.000001;

// Things that repel each other
export type FDNode = {
  x: number;
  y: number;
  force: { x: number; y: number };
  payload: any;
  radius: number; // minimum
};

// Springs that pull its two ends closer
export type FDEdge = {
  from: FDNode;
  to: FDNode;
  minLength: number; // minimum space between the two nodes
  strength: number; // how strongly the two nodes attract
};

// Exported for unit testing only
export function randomizeCoordinates(nodes: FDNode[], length: number) {
  nodes.forEach((node) => {
    node.x = Math.random() * length;
    node.y = Math.random() * length;
  });
}

// https://en.wikipedia.org/wiki/Coulomb%27s_law
// Exported for unit testing only
export function repel(node1: FDNode, node2: FDNode) {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  const distSquared = Math.pow(dx, 2) + Math.pow(dy, 2);
  const dist = Math.sqrt(distSquared);
  const force = RepelConstant / distSquared;
  const forceX = force * Math.cos(dx / dist);
  const forceY = force * Math.cos(dy / dist);
  node1.force.x -= forceX;
  node1.force.y -= forceY;
  node2.force.x += forceX;
  node2.force.y += forceY;
}

// https://en.wikipedia.org/wiki/Hooke%27s_law
// Exported for unit testing only
export function attract({ from, to, minLength, strength }: FDEdge) {
  const dx = from.x - to.x;
  const dy = from.y - to.y;
  const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  if (dist <= minLength) {
    return; // they will get repelled away from each other
  } else {
    // const force = (dist - minLength) * strength * AttractConstant;
    const force = (dist - minLength) * AttractConstant;
    const forceX = force * Math.cos(dx / dist);
    const forceY = force * Math.cos(dy / dist);
    from.force.x += forceX;
    from.force.y += forceY;
    to.force.x -= forceX;
    to.force.y -= forceY;
  }
}

function simulate(nodes: FDNode[], edges: FDEdge[]) {
  // Apply a repulsion between nodes
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = i + 1; j < nodes.length; ++j) {
      repel(nodes[i], nodes[j]);
    }
  }
  // Apply an attraction between nodes sharing an edge
  edges.forEach(attract);

  // Apply the force on the nodes and reset them
  nodes.forEach((node) => {
    node.x += node.force.x;
    node.force.x = 0;
    node.y += node.force.y;
    node.force.y = 0;
  });
}

// Exported for testing
export function forceDirectedGraphGeneral(
  nodes: FDNode[],
  edges: FDEdge[],
  approxRadius: number
) {
  // place nodes randomly
  // setRandomCoordinates(nodes, 2 * approxRadius);
  for (let i = 0; i < Iterations; ++i) {
    simulate(nodes, edges);
  }
}

export function forceDirectedGraph(
  imports: JavaPackageImport[],
  packages: JavaPackageWithRadius[]
): JavaProjectWithCoordinates {
  const result = {
    packages,
  } as JavaProjectWithCoordinates;
  // determine approximate total radius to distribute the nodes

  return result;
}
