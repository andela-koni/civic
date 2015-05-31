var d3 = require('d3');
var _  = require('lodash');

var dblClick = function (d) {
  var vertices = _.values(civicStore.vertices);
  var edges    = _.chain(civicStore.edges).values().flatten().value();
  var width    = civicStore.dimensions.width;
  var height   = civicStore.dimensions.height;
  var eScale   = civicStore.scale.employee;
  var tScale   = civicStore.scale.twitter;

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

  civicStore.nodes.centered = _.cloneDeep(d);

  // Half viewbox...
  civicStore.nodes.centered.x = width / 2 - 10;
  civicStore.nodes.centered.y = height / 2 - 60;

  var force = d3.layout
    .force()
    .nodes(vertices)
    .size([width, height])
    .links(edges)
    .linkStrength(0)
    .charge(function(d) {
      if (d.render === 1) {
        if (d.employees !== null)
          return -6 * eScale(d.employees);
        else
          return -25;
      } else
        return 0;
    })
    .linkDistance(50)
    .on("tick", require('./tick'))
    .start();
};

module.exports = dblClick;
