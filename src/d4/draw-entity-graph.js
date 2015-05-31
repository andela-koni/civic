var d3 = require('d3');

var resize    = require('./resize');
var tick      = require('./tick');
var dragger   = require('./drag');
var nodeHover = require('./node-hover');
var offNode   = require('./off-node');
var click     = require('./click');
var wrap      = require('./wrap');

civicStore.links = civicStore.links || {
  funding: null,
  investment: null,
  collaboration: null,
  data: null
};

civicStore.nodes = civicStore.nodes || {
  centered: {},
  current: {},
  texts: [],
  byType: {
    "For-Profit": [],
    "Non-Profit": [],
    "Government": [],
    "Individual": []
  },
  mostConnected: {
    "For-Profit": [],
    "Non-Profit": [],
    "Government": [],
    "Individual": []
  }
};

civicStore.dimensions = {
  width: 1000,
  height: 1000
};

civicStore.colors = {
  translucent: "rgba(0,0,0,0.6)",     // 40% transparent
  edit: "rgb(46, 146, 207)",          // blue
  node: {
    funding: "rgb(111,93,168)",       // lavender
    investment: "rgb(38,114,114)",    // teal
    collaboration: "rgb(235,232,38)", // yellow
    data: "rgb(191,72,150)"           // pink
  },
  entityType: {
    "For-Profit": "rgb(127,186,0)",   // lime
    "Non-Profit": "rgb(0,164,239)",   // cyan
    "Government": "rgb(242,80,34)",   // orange
    "Individual": "rgb(255,185,0)"    // gold
  }
};

civicStore.scale = {
  employee: d3.scale.sqrt().domain([10, 130000]).range([10, 50]),
  twitter: d3.scale.sqrt().domain([10, 1000000]).range([10, 50])
};

civicStore.clearResetFlag = 1;

var drawEntityGraph = function () {
  console.log("Drawing the entity graph.");

  // Set the default height and width
  var width  = civicStore.dimensions.width;
  var height = civicStore.dimensions.height;

  /**
   *  Create the root svg#network within div.content
   */
   civicStore.svg = d3
    .select('.content')
    .append('svg')
    .attr("xmlns", 'http://www.w3.org/2000/svg')
    .attr("id", 'network')
    .attr("height", height)
    .attr("width", width)
    .style("top", "-50px")
    .style("position", "relative");

  d3
    .select('body > nav > nav > div')
    .append('div')
    .attr('id', 'editBox')
    .append('p')
    .text('Edit')
    .style('color', civicStore.colors.edit);

  /**
   *  Set the window resize handler and call it immediately
   */
  d3
    .select(window)
    .on('resize', resize);

  resize();

  /**
   *  Set the viewbox parameters on root
   */
  civicStore.svg
    .attr("viewBox", [0, 0, width, height].join(' '))
    .attr("preserveAspectRatio", 'xMidYMid');

  /**
    *  Get the vertices and edges for the graph from the store
    */
  var vertices = _.values(civicStore.vertices);
  var edges    = _.chain(civicStore.edges).values().flatten().value();
  var network  = d3.select('#network');  // div to hold graph
  var width    = network.attr('width');
  var height   = network.attr('height');

  /**
   *  Set up the forced layout of the graph
   */
  var force = d3.layout
    .force()
    .nodes(vertices)
    .size([civicStore.dimensions.width, civicStore.dimensions.height])
    .links(edges)
    .linkStrength(0)
    .charge(
      function(d) {
        return d.employees ?
          -6 * civicStore.scale.employee(d.employees) : -25;
      }
    )
    .linkDistance(50);

  /**
   *  Set the drag start, drag, stop
   */
  var drag = force
    .drag()
    .on("dragstart", dragger.drag)
    .on("drag", dragger.drag)
    .on("dragend", dragger.dragEnd);

  /**
   *  Add the links
   */
  _.keys(civicStore.links)
    .forEach(function (link) {
      civicStore.links[link] = civicStore.svg
        .selectAll("." + link)
        .data(civicStore.edges[link])
        .enter()
        .append("line")
        .attr("class", link)
        .style("stroke", civicStore.colors.node[link])
        .style("stroke-width", "1")
        .style("opacity", "0.2")
        .style("visibility", "visible");
    });

  var dblClick = require('./dbl-click');

  /**
   *  Initialize all nodes
   */
  civicStore.nodes.all = civicStore.svg
    .selectAll(".entity")
    .data(vertices)
    .enter()
    .append("g")
    .attr(
      "class",
      function (d) {
        return "entity " + d.entity_type.toLowerCase()
      }
    )
    .style("visibility", "visible")
    .on('dblclick', dblClick)
    .call(drag);

    force
      // .on("tick", tick)
      .start();

  /**
   *  Add the graph nodes
   */
  _.keys(civicStore.nodes.byType)
    .forEach(
      function(nodeType) {
        civicStore.nodes.byType[nodeType] = civicStore.svg
          .selectAll("." + nodeType.toLowerCase());
      }
    );

  /**
   *  Set the most connected nodes for each type
   */
  _.keys(civicStore.nodes.byType)
    .forEach(
      function(nodeType) {
        civicStore.svg
          .selectAll("." + nodeType.toLowerCase())
          .sort(function(a, b) { return b.weight - a.weight; })
          .each(function(d, i) {
            if (civicStore.nodes.mostConnected[nodeType].length < 5) {
              civicStore.nodes.mostConnected[nodeType].push(d.name);
            }
          })
      }
    );

  /**
   *  Set the text elements
   */
  var most = civicStore.nodes.mostConnected;
  civicStore.nodes.texts = civicStore.svg
    .selectAll('.entity')
    .append('text')
    .text(
      function(d) {return d.nickname; }
    )
    .attr("x", 0)
    .attr("dy", "0.1em")
    .attr(
      "y",
      function (d) {
        return d.employees ?
          civicStore.scale.employee(d.employees) + 10 :
          17;
      }
    )
    .style(
      "opacity",
      function (d) {
        return _.includes(most[d.entity_type], d.name) ? 1 : 0;
      }
    )
    .style("font-size", "14px")
    .style("color", "white")
    .style("pointer-events", "none");

console.log("nodeInit", civicStore.nodes.all);
  civicStore.nodes.node = civicStore.nodes.all
    .append("circle")
    .attr(
      "r",
      function (d) {
        return (d.employees) ?
          civicStore.scale.employee(d.employees) : 7;
      }
    )
    .style(
      "fill",
      function (d) {
        return civicStore.colors.entityType[d.entity_type];
      }
    )
    .attr("cx", function (d) { return 3; }) // d.x
    .attr("cy", function (d) { return 3; }) // d.y
    .style("stroke-width", "1.5px")
    .style("stroke", "white")
    .on("mouseover", nodeHover)
    .on("mouseout", offNode)
    .on("click", click);

  civicStore.nodes.texts.call(wrap, 80);

  while (force.alpha() > 0.025) { force.tick(); }
};

module.exports = drawEntityGraph;
