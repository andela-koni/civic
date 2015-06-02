var d3 = require('d3');
var _  = require('lodash');

function tick(e) {
  console.log("Calling tick with e = ", e);
  // Push different nodes in different directions for clustering.
  var k = 8 * e.alpha;

  var filteredNodes = civicStore.nodes.filtered;
  var centeredNode  = civicStore.nodes.centered;
  var fundLink      = civicStore.links.funding;
  var investLink    = civicStore.links.investment;
  var collabLink    = civicStore.links.collaboration;
  var dataLink      = civicStore.links.data;
  var node          = civicStore.nodes.node;
  var textElements  = civicStore.nodes.texts;

  /* Four quandrant separation */
  filteredNodes.forEach(function(o, i) {
    switch (o.entity_type) {
      case "For-Profit":
        o.x += (k + k);
        o.y += (-k - k);
        break;
      case "Non-Profit":
        o.x += (-k - k);
        o.y += (k + k);
        break;
      case "Individual":
        o.x += (k + k);
        o.y += (k + k);
        break;
      case "Government":
        o.x += (-k - k);
        o.y += (-k - k);
        break
    }
  });

  if (_.isEmpty(centeredNode)) {
    fundLink
      .attr("x1", function (d) {
        if (d.source === ctrNode) { d.source.x = ctrNode.x; }
        return d.source.x;
      })
      .attr("y1", function (d) {
        if (d.source === ctrNode) { d.source.y = ctrNode.y; }
        return d.source.y;
      })
      .attr("x2", function (d) {
        if (d.target === ctrNode) { d.target.x = ctrNode.x; }
        return d.target.x;
      })
      .attr("y2", function (d) {
        if (d.target === ctrNode) { d.target.y = ctrNode.y; }
        return d.target.y;
      });

    investLink
      .attr("x1", function (d) {
        if (d.source === ctrNode) { d.source.x = ctrNode.x; }
        return d.source.x;
      })
      .attr("y1", function (d) {
        if (d.source === ctrNode) { d.source.y = ctrNode.y; }
        return d.source.y;
      })
      .attr("x2", function (d) {
        if (d.target === ctrNode) { d.target.x = ctrNode.x; }
        return d.target.x;
      })
      .attr("y2", function (d) {
        if (d.target === ctrNode) { d.target.y = ctrNode.y; }
        return d.target.y;
      });

    collabLink
      .attr("x1", function (d) {
        if (d.source === ctrNode) { d.source.x = ctrNode.x; }
        return d.source.x;
      })
      .attr("y1", function (d) {
        if (d.source === ctrNode) { d.source.y = ctrNode.y; }
        return d.source.y;
      })
      .attr("x2", function (d) {
        if (d.target === ctrNode) { d.target.x = ctrNode.x; }
        return d.target.x;
      })
      .attr("y2", function (d) {
        if (d.target === ctrNode) { d.target.y = ctrNode.y; }
        return d.target.y;
      });

    dataLink
      .attr("x1", function (d) {
        if (d.source === ctrNode) { d.source.x = ctrNode.x; }
        return d.source.x;
      })
      .attr("y1", function (d) {
        if (d.source === ctrNode) { d.source.y = ctrNode.y; }
        return d.source.y;
      })
      .attr("x2", function (d) {
        if (d.target === ctrNode) { d.target.x = ctrNode.x; }
        return d.target.x;
      })
      .attr("y2", function (d) {
        if (d.target === ctrNode) { d.target.y = ctrNode.y; }
        return d.target.y;
      });

    node
      .attr(
        "cx",
        function (d) { return d.x; }
      )
      .attr(
        "cy",
        function (d) { return d.y; }
      );

    textElements.attr("transform", transformText);
  } else {
    fundLink
      .attr(
        "x1",
        function (d) {
          if (d.source === centeredNode) { d.source.x = centeredNode.x; }
          return d.source.x;
        }
      )
      .attr(
        "y1",
        function (d) {
          if (d.source === centeredNode) { d.source.y = centeredNode.y; }
          return d.source.y;
        }
      )
      .attr(
        "x2",
        function (d) {
          if (d.target === centeredNode) { d.target.x = centeredNode.x; }
          return d.target.x;
        }
      )
      .attr(
        "y2",
        function (d) {
          if (d.target === centeredNode) { d.target.y = centeredNode.y; }
          return d.target.y;
        }
      )

    investLink
      .attr(
        "x1",
        function (d) {
          if (d.source === centeredNode) { d.source.x = centeredNode.x; }
          return d.source.x;
        }
      )
      .attr(
        "y1",
        function (d) {
          if (d.source === centeredNode) { d.source.y = centeredNode.y; }
          return d.source.y;
        }
      )
      .attr(
        "x2",
        function (d) {
          if (d.target === centeredNode) { d.target.x = centeredNode.x; }
          return d.target.x;
        }
      )
      .attr(
        "y2",
        function (d) {
          if (d.target === centeredNode) { d.target.y = centeredNode.y; }
          return d.target.y;
        }
      )

    collabLink
      .attr(
        "x1",
        function (d) {
          if (d.source === centeredNode) { d.source.x = centeredNode.x; }
          return d.source.x;
        }
      )
      .attr(
        "y1",
        function (d) {
          if (d.source === centeredNode) { d.source.y = centeredNode.y; }
          return d.source.y;
        }
      )
      .attr(
        "x2",
        function (d) {
          if (d.target === centeredNode) { d.target.x = centeredNode.x; }
          return d.target.x;
        }
      )
      .attr(
        "y2",
        function (d) {
          if (d.target === centeredNode) { d.target.y = centeredNode.y; }
          return d.target.y;
        }
      )

    dataLink
      .attr(
        "x1",
        function (d) {
          if (d.source === centeredNode) { d.source.x = centeredNode.x; }
          return d.source.x;
        }
      )
      .attr(
        "y1",
        function (d) {
          if (d.source === centeredNode) { d.source.y = centeredNode.y; }
          return d.source.y;
        }
      )
      .attr(
        "x2",
        function (d) {
          if (d.target === centeredNode) { d.target.x = centeredNode.x; }
          return d.target.x;
        }
      )
      .attr(
        "y2",
        function (d) {
          if (d.target === centeredNode) { d.target.y = centeredNode.y; }
          return d.target.y;
        }
      )

    node
      .attr(
        "cx",
        function(d, i) {
          if ((d3.select(node)[0][0].data())[i].name === centeredNode.name) {
            d.x = centeredNode.x;
          }
          return d.x;
        }
      )
      .attr(
        "cy",
        function(d, i) {
          if ((d3.select(node)[0][0].data())[i].name === centeredNode.name) {
            d.y = centeredNode.y;

          }
          return d.y;
        }
      );

    textElements.attr(
      "transform",
      function(d) { return "translate(" + d.x + "," + d.y + ")"; }
    )
  }
};

module.exports = tick;
