var d3 = require('d3');
var _  = require('lodash');

var drawVertices = require('./draw-vertices');

var drawGraph = function (root) {
  console.log("In drawGraph");
  var rawNodes = window.civicStore.vertices;

  console.log("rawNodes", rawNodes);

  drawVertices(rawNodes);
};

module.exports = drawGraph;
