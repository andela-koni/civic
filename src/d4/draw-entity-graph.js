var d3 = require("d3");
var $  = require("jquery");
var _  = require("lodash");

var resize    = require("./resize");
var tick      = require("./tick");
var nodeHover = require("./node-hover");
var offNode   = require("./off-node");
var click     = require("./click");
var wrap      = require("./wrap");

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
    forProfit: [],
    nonProfit: [],
    government: [],
    individual: []
  },
  mostConnected: {
    forProfit: [],
    nonProfit: [],
    government: [],
    individual: []
  }
};

civicStore.dimensions = {
  width: 1000,
  height: 1000
};

civicStore.colors = {
  translucent: "rgba(0, 0, 0, 0.6)",    // 40% transparent
  white: "rgb(255, 255, 255)",          // white
  edit: "rgb(46, 146, 207)",            // blue
  node: {
    funding:       "rgb(111, 93, 168)", // lavender
    investment:    "rgb(38, 114, 114)", // teal
    collaboration: "rgb(235, 232, 38)", // yellow
    data:          "rgb(191, 72, 150)"  // pink
  },
  entityType: {
    "For-Profit": "rgb(127 ,186, 0)",   // lime
    "Non-Profit": "rgb(0, 164, 239)",   // cyan
    "Government": "rgb(242, 80, 34)",   // orange
    "Individual": "rgb(255, 185, 0)"    // gold
  }
};

civicStore.scale = {
  employee: d3.scale.sqrt().domain([10, 130000]).range([10, 50]),
  twitter: d3.scale.sqrt().domain([10, 1000000]).range([10, 50])
};

civicStore.lookups = {
  byName: {},
  byLocation: {},
  sortedNames: [],
  sortedLocations: []
}

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
    .select(".content")
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("id", "network")
    .attr("height", height)
    .attr("width", width)
    .style("top", "-50px")
    .style("position", "relative");

  d3
    .select("body > nav > nav > div")
    .append("div")
    .attr("id", "editBox")
    .append("p")
    .text("Edit")
    .style("color", civicStore.colors.edit);

  /**
   *  Set the window resize handler and call it immediately
   */
  $(window).on("resize", resize).trigger("resize");

  /**
   *  Set the viewbox parameters on root
   */
  civicStore.svg
    .attr("viewBox", [0, 0, width, height].join(" "))
    .attr("preserveAspectRatio", "xMidYMid");

  /**
    *  Get the rawNodes and edges for the graph from the store
    */
  var rawNodes = civicStore.vertices;
  var rawFundingConnections = civicStore.edges.funding;
  var rawInvestmentConnections = civicStore.edges.investment;
  var rawCollaborationConnections = civicStore.edges.collaboration;
  var rawDataConnections = civicStore.edges.data;

  var rawConnections = civicStore.edges.all = rawFundingConnections
    .concat(rawInvestmentConnections)
    .concat(rawCollaborationConnections)
    .concat(rawDataConnections);

  var filteredNodes = civicStore.nodes.filtered =
    rawNodes.filter(function (d) { return d.render; });

  var fundingConnections = civicStore.nodes.funding =
    rawFundingConnections.filter(function (d) { return d.render; });

  var investmentConnections = civicStore.nodes.investment =
    rawInvestmentConnections.filter(function (d) { return d.render; });

  var collaborationConnections = civicStore.nodes.collaboration =
    rawCollaborationConnections.filter(function (d) { return d.render; });

  var dataConnections = civicStore.nodes.data =
    rawDataConnections.filter(function (d) { return d.render; });

  /**
   *  Set up the forced layout of the graph
   */
  var force = d3.layout
    .force()
    .nodes(rawNodes)
    .size([civicStore.dimensions.width, civicStore.dimensions.height])
    .links(rawConnections)
    .linkStrength(0)
    .charge(
      function(d) {
        if (d.render) {
          if (d.employees) { return -6 * eScale(d.employees); }
          else { return -25; }
        } else {
          return 0;
        }
      }
    )
    .linkDistance(50);

var dragger   = require("./drag");
var dragEnd = dragger.dragEnd;
  /**
   *  Set the drag start, drag, stop
   */
  var drag = force
    .drag()
    .on("dragstart", drag)
    .on("drag", drag)
    .on("dragend", dragEnd);

  /**
   *  Add the links
   */
  var fundLink = civicStore.links.funding = civicStore.svg
    .selectAll(".funding")
    .data(fundingConnections)
    .enter()
    .append("line")
    .attr("class", "funding")
    .style("stroke", civicStore.colors.node.funding)
    .style("stroke-width", "1")
    .style("opacity", "0.2")
    .style("visibility", "visible");

  var investLink = civicStore.links.investment = civicStore.svg
    .selectAll(".investment")
    .data(investmentConnections)
    .enter()
    .append("line")
    .attr("class", "investment")
    .style("stroke", civicStore.colors.node.investment)
    .style("stroke-width", "1")
    .style("opacity", "0.2")
    .style("visibility", "visible");

  var collabLink = civicStore.links.collaboration = civicStore.svg
    .selectAll(".collaboration")
    .data(collaborationConnections)
    .enter()
    .append("line")
    .attr("class", "collaboration")
    .style("stroke", civicStore.colors.node.collaboration)
    .style("stroke-width", "1")
    .style("opacity", "0.2")
    .style("visibility", "visible");

  var dataLink = civicStore.links.data = civicStore.svg
    .selectAll(".data")
    .data(dataConnections)
    .enter()
    .append("line")
    .attr("class", "data")
    .style("stroke", civicStore.colors.node.data)
    .style("stroke-width", "1")
    .style("opacity", "0.2")
    .style("visibility", "visible");

    console.log("fundLink", fundLink);
    console.log("investLink", investLink);
    console.log("collabLink", collabLink);
    console.log("dataLink", dataLink);

  var dblClick = require("./dbl-click");

  /**
   *  Initialize all nodes
   */
  var nodesInitialized = civicStore.nodes.all = civicStore.svg
    .selectAll(".node")
    .data(filteredNodes)
    .enter()
    .append("g")
    .attr(
      "class",
      function (d) {
        return "node "; // + d.entity_type.toLowerCase()
      }
    )
    .style("visibility", "visible")
    .on("dblclick", dblClick)
    .call(drag);

    force
      .on("tick", tick)
      // .start();

  /**
   *  Add the graph nodes
   */
  var forProfitNodes = civicStore.nodes.byType.forProfit = civicStore.svg
    .selectAll(".node")
    .filter(
      function (d) {
        return d.entity_type === "For-Profit";
      }
    )
    .sort(
      function (a, b) { return b.weight - a.weight; }
    );

  var nonProfitNodes = civicStore.nodes.byType.nonProfit = civicStore.svg
    .selectAll(".node")
    .filter(
      function (d) {
        return d.entity_type === "Non-Profit";
      }
    )
    .sort(
      function (a, b) { return b.weight - a.weight; }
    );

  var governmentNodes = civicStore.nodes.byType.government = civicStore.svg
    .selectAll(".node")
    .filter(
      function (d) {
        return d.entity_type === "Government";
      }
    )
    .sort(
      function (a, b) { return b.weight - a.weight; }
    );

  var individualNodes = civicStore.nodes.byType.individual = civicStore.svg
    .selectAll(".node")
    .filter(
      function (d) {
        return d.entity_type === "Individual";
      }
    )
    .sort(
      function (a, b) {
        console.log(a.name, a.weight, b.name, b.weight);
        return b.weight - a.weight;
      }
    );

  console.log("forProfitNodes", forProfitNodes);
  console.log("nonProfitNodes", nonProfitNodes);
  console.log("governmentNodes", governmentNodes);
  console.log("individualNodes", individualNodes);

  /**
   *  Get the five most connected for each type
   */
  var fmcForProfit =
    civicStore.nodes.mostConnected.forProfit = {};
  forProfitNodes.each(
    function (d, i) {
      if (i < 5) {
        fmcForProfit[d.name] = d.weight;
      }
    }
  );

  var fmcNonProfit =
    civicStore.nodes.mostConnected.nonProfit = {};
  nonProfitNodes.each(
    function (d, i) {
      if (i < 5) {
        fmcNonProfit[d.name] = d.weight;
      }
    }
  );

  var fmcGovernment =
    civicStore.nodes.mostConnected.government = {};
  governmentNodes.each(
    function (d, i) {
      if (i < 5) {
        fmcGovernment[d.name] = d.weight;
      }
    }
  );

  var fmcIndividual =
    civicStore.nodes.mostConnected.individual = {};
  individualNodes.each(
    function (d, i) {
      if (i < 5) {
        fmcIndividual[d.name] = d.weight;
      }
    }
  );

  console.log("fmcForProfit", fmcForProfit);
  console.log("fmcNonProfit", fmcNonProfit);
  console.log("fmcGovernment", fmcGovernment);
  console.log("fmcIndividual", fmcIndividual);

  /**
   *  Set the text elements
   */
  var textElements = civicStore.nodes.texts = civicStore.svg
    .selectAll(".node")
    .append("text")
    .text(function(d) {return d.nickname; })
    .attr("x", 0)
    .attr("dy", "0.1em")
    .attr(
      "y",
      function (d) {
        return d.employees ?
          civicStore.scale.employee(d.employees) + 10 : 17;
      }
    )
    .style(
      "opacity",
      function (d) {
        switch (d.entity_type) {
          case "For-Profit":
            return fmcForProfit.hasOwnProperty(d.name) ? 1 : 0;
            break;
          case "Non-Profit":
            return fmcNonProfit.hasOwnProperty(d.name) ? 1 : 0;
            break;
          case "Government":
            return fmcGovernment.hasOwnProperty(d.name) ? 1 : 0;
            break;
          case "Individual":
            return fmcIndividual.hasOwnProperty(d.name) ? 1 : 0;
            break;
        }
      }
    )
    .style("font-size", "14px")
    .style("color", civicStore.colors.white)
    .style("pointer-events", "none");

  var node = civicStore.nodes.node = nodesInitialized
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
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .style("stroke-width", "1.5px")
    .style("stroke", civicStore.colors.white)
    .on("mouseover", nodeHover)
    .on("mouseout", offNode)
    .on("click", click);

  textElements.call(wrap, 80);

  while (force.alpha() > 0.025) { force.tick(); }

  /**
   *  Create the entities hash and sorted lists
   *  (equivalent to searchAutoComplete())
   */
  var entitiesHash = civicStore.lookups.byName;
  var locationsHash = civicStore.lookups.byLocation
  var sortedNamesList = civicStore.lookups.sortedNames;
  var sortedLocationsList = civicStore.lookups.sortedLocations;

  filteredNodes.forEach(
    function (d) {
      var name = d.name.toLowerCase();
      var nickname = d.nickname.toLowerCase();

      if (!(name in entitiesHash)) {
        entitiesHash[name] = d;
        sortedNamesList.push(d.name);
      }

      if (!(nickname in entitiesHash)) {
        entitiesHash[nickname] = d;
        sortedNamesList.push(d.nickname);
      }

      d.locations.forEach(
        function (location) {
          var locMixed = [
            location.city,
            location.state,
            location.country
          ].join(", ");
          var locLower = locMixed.toLowerCase();

          if (!(locLower in locationsHash)) {
            locationsHash[locLower] = locationsHash[locLower] || [];
            locationsHash[locLower].push(d);
            sortedLocationsList.push(locMixed);
          }
        }
      )
    }
  );

  sortedNamesList = _.sortBy(
    sortedNamesList,
    function (name) { return name.toLowerCase(); }
  );

  sortedLocationsList = _.sortBy(
    sortedLocationsList,
    function (location) { return location.toLowerCase(); }
  );

};

module.exports = drawEntityGraph;
