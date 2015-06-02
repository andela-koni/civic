var d3 = require('d3');
var _  = require('lodash');

// VERIFIED
var dblClick = function (d) {
  var rawNodes       = civicStore.vertices;
  var rawConnections = civicStore.edges.all;
  var width          = civicStore.dimensions.width;
  var height         = civicStore.dimensions.height;
  var eScale         = civicStore.scale.employee;
  var tScale         = civicStore.scale.twitter;

  d3
    .select(this)
    .classed( "fixed", function(d) { d.fixed = false; });

  d3
    .select(this)
    .on('mousedown.drag', null);

  var dblclickobject = (d3.select(this).data())[0];

  var svgWidth = parseInt(
    civicStore.svg
      .style("width")
      .substring(0, ((civicStore.svg.style("width")).length + 1) / 2)
  );

  var svgHeight = parseInt(
    civicStore.svg
      .style("height")
      .substring(0, ((civicStore.svg.style("height")).length + 1) / 2)
  );

  var halfSVGWidth  = parseInt(svgWidth / 2);
  var halfSVGHeight = parseInt(svgHeight / 2);

  var multiplierX = svgWidth / width;
  var multiplierY = svgHeight / height;

  var scaledDX = multiplierX * d.x;
  var scaledDY = multiplierY * d.y;

  var centeredNode = civicStore.nodes.centered = $.extend(true, {}, d);

  // Half viewbox...
  centeredNode.x = width / 2 - 10;
  centeredNode.y = height / 2 - 60;

  var force = d3.layout
    .force()
    .nodes(rawNodes)
    .size([width, height])
    .links(rawConnections)
    .linkStrength(0)
    .charge(function(d) {
      if (d.render) {
        if (d.employees) { return -6 * eScale(d.employees); }
        else { return -25; }
      } else {
        return 0;
      }
    })
    .linkDistance(50)
    .on("tick", require('./tick'))
    .start();
};

module.exports = dblClick;
