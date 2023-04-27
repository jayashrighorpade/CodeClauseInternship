var nodes = [
  { "id": "root", "name": "Mind Map", "parent": null }
];

var links = [];

var width = 800,
    height = 400;

var svg = d3.select("#mind-map").append("svg")
    .attr("width", width)
    .attr("height", height);

var simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(function(d) { return d.id; }).distance(100))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2));

var link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .on("click", function(d) { addNode(d.id); })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

var text = svg.selectAll(".text")
    .data(nodes)
    .enter().append("text")
    .attr("class", "text")
    .text(function(d) { return d.name; });

simulation
    .nodes(nodes)
    .on("tick", ticked);

simulation.force("link")
    .links(links);

function ticked() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  text
      .attr("x", function(d) { return d.x + 15; })
      .attr("y", function(d) { return d.y; });
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function addNode(parentId) {
  var parentNode = nodes.find(function(n) {
    return n.id === parentId;
  });

  var nodeName = prompt("Enter node name:");

  if (nodeName) {
    var newNode = { "id": generateId(), "name": nodeName, "parent": parentId };
    nodes.push(newNode);
    links.push({ "source": parentNode, "target": newNode });
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    updateGraph();
  }
}

function generateId() {
  var id = Math.random().toString(36).substr(2, 9);
  while (nodes.some(function(n) { return n.id === id; })) {
    id = Math.random().toString(36).substr(2, 9);
  }
  return id;
}

function drawMindmap(data, containerId) {
  var container = document.getElementById(containerId);
  if (!container) {
    console.error("Container element not found.");
    return;
  }
  container.innerHTML = "";
  var nodes = createMindmapNodes(data);
  var links = createMindmapLinks(nodes);

  var svg = createMindmapSVG(nodes, links);
  container.appendChild(svg);
}

drawMindmap();
