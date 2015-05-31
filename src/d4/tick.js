var d3 = require('d3');
var _  = require('lodash');

function tick(e) {
  console.log("Calling tick with e = ", e);
  // Push different nodes in different directions for clustering.
  var k = 8 * e.alpha;

  /* Four quandrant separation */
  _.values(civicStore.vertices).forEach(function(o, i) {
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

  _.keys(civicStore.links).forEach(
    function(link) {
      civicStore.links[link]
        .attr("x1", function(d) {
          if (d.source === ctrNode) { d.source.x = ctrNode.x; }
          return d.source.x;
        })
        .attr("y1", function(d) {
          if (d.source === ctrNode) { d.source.y = ctrNode.y; }
          return d.source.y;
        })
        .attr("x2", function(d) {
          if (d.target === ctrNode) { d.target.x = ctrNode.x; }
          return d.target.x;
        })
        .attr("y2", function(d) {
          if (d.target === ctrNode) { d.target.y = ctrNode.y; }
          return d.target.y;
        });
    }
  );

  var node = civicStore.nodes.current;
  var ctrNode = civicStore.nodes.centered;

  node
    .attr(
      "cx",
      function(d, i) {
        if ((d3.select(node)[0][0].data())[i].name === ctrNode.name) {
          d.x = ctrNode.x;
        }
        return d.x;
      }
    )
    .attr(
      "cy",
      function(d, i) {
        if ((d3.select(node)[0][0].data())[i].name === ctrNode.name) {
          d.y = ctrNode.y;

        }
        return d.y;
      }
    );

  civicStore.nodes.texts.attr(
    "transform",
    function(d) { return "translate(" + d.x + "," + d.y + ")"; }
  );
}

module.exports = tick;

