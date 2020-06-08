import {
  attract,
  FDEdge,
  FDNode,
  repel,
  forceDirectedGraphGeneral,
  randomizeCoordinates,
} from "./forceDirectedGraph";

test("attract()", () => {
  const edge: FDEdge = {
    from: {
      force: { x: 0, y: 0 },
      payload: "Node 1",
      radius: 100,
      x: 0,
      y: 0,
    },
    to: {
      force: { x: 0, y: 0 },
      payload: "Node 2",
      radius: 100,
      x: 2000,
      y: 2000,
    },
    minLength: 100,
    strength: 5,
  };
  attract(edge);
  expect(edge.from.force.x > 0).toBe(true);
  expect(edge.from.force.y > 0).toBe(true);
  expect(edge.to.force.x < 0).toBe(true);
  expect(edge.to.force.y < 0).toBe(true);
  console.log(edge);
});

test("repel()", () => {
  const n1: FDNode = {
    force: { x: 0, y: 0 },
    payload: "Node 1",
    radius: 100,
    x: 0,
    y: 0,
  };
  const n2: FDNode = {
    force: { x: 0, y: 0 },
    payload: "Node 2",
    radius: 100,
    x: 400,
    y: 400,
  };
  repel(n1, n2);
  expect(n1.force.x < 0).toBe(true);
  expect(n1.force.y < 0).toBe(true);
  expect(n2.force.x > 0).toBe(true);
  expect(n2.force.y > 0).toBe(true);
  console.log(n1);
  console.log(n2);
});

function makeNode(payload: any, radius: number = 100): FDNode {
  return {
    force: {
      x: 0,
      y: 0,
    },
    payload,
    radius,
    x: 0,
    y: 0,
  };
}

test("forceDirectedGraphGeneral()", () => {
  const nodes: FDNode[] = [
    makeNode("0"),
    makeNode("1"),
    makeNode("2"),
    makeNode("3"),
    makeNode("4"),
  ];
  const edges: FDEdge[] = [
    {
      from: nodes[0],
      to: nodes[1],
      minLength: 300,
      strength: 3,
    },
    {
      from: nodes[0],
      to: nodes[2],
      minLength: 300,
      strength: 3,
    },
    {
      from: nodes[3],
      to: nodes[1],
      minLength: 500,
      strength: 1,
    },
    {
      from: nodes[4],
      to: nodes[3],
      minLength: 500,
      strength: 1,
    },
  ];
  const approxRadius = 2000;
  randomizeCoordinates(nodes, 2 * approxRadius);
  console.log(nodes);
  forceDirectedGraphGeneral(nodes, edges, approxRadius);
  console.log(nodes);
});
