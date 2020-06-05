/*
 This library contains an algorithm for laying out nodes of a graph in the most popular algorithm (https://en.wikipedia.org/wiki/Force-directed_graph_drawing)
 https://github.com/vasturiano/force-graph
*/

// Example code adapted from https://github.com/vasturiano/force-graph/blob/master/example/img-nodes/index.html
const imgs = [
  "island1.png",
  "island2.png",
  "island3.png",
  "island4.png",
  "island5.png",
].map((src) => {
  const img = new Image();
  img.src = `./${src}`;
  return img;
});

// *** Custom code -- this is how we can create a Java class island:

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
const customElem = document.createElement("canvas");
customElem.width = 1200;
customElem.height = 1000;
const ctx = customElem.getContext("2d");
const customImg = new Image();
customImg.src = "./house.png";

customImg.style = "fit: cover";
window.onload = () => {
  ctx.drawImage(imgs[0], 0, 0);

  // https://codepo8.github.io/canvas-images-and-pixels/resize.html
  ctx.drawImage(
    customImg,
    0, // Think this is what part of the house to use, (0, 0) means keep all of the house, (200,200) means clip off 200 x and 200 y
    0, // Think this is what part of the house to use, (0, 0) means keep all of the house, (200,200) means clip off 200 x and 200 y
    customImg.width, // This is the island's x and y size
    customImg.height, // This is the island's x and y size
    300, // Think this is the house's x and y origin relative to the canvas (customElem)
    300, // Think this is the house's x and y origin relative to the canvas (customElem)
    200, // Think this is the house's x and y size
    200 // Think this is the house's x and y size, relative to thhe island, which is like 1000
  );
};

imgs.push(customElem);
// *** End of custom code -------------------------------

// Example code continued (from https://github.com/vasturiano/force-graph/blob/master/example/img-nodes/index.html)
// Random connected graph
const gData = {
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph()(document.getElementById("graph"))
  .nodeCanvasObject(({ img, x, y }, ctx) => {
    const size = 12;
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  })
  .graphData(gData);

document.getElementById("graph").addEventListener("click", (event) => {
  console.log(event);
});
