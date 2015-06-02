var d3 = require('d3');

var u = require('../utilities');

var drawVertices = function (vertices) {
  console.log("In drawVertices");
  var n = d3.select('#network');
  var w   = network.attr('width');
  var h  = network.attr('height');

  var force = d3
    .layout
    .force()
    .nodes(window.vertices)
    .size([w, h])
    .links(window.connections)
    .linkStrength(0)
    .charge(function(vertex) {
      if (vertex.employees) {
        return -6 * civicStore.scale.employee(vertex.employees);
      } else {
        return -25;
      }
    })
    .linkDistance(50);
};

module.exports = drawVertices;
