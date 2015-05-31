var d3 = require('d3');

var nodeHover = require('./node-hover');
var offNode   = require('./off-node');
var click     = require('./click');

exports.dragStart = function (d) {
  d3
    .select(this)
    .classed("fixed", function(d) { d.fixed = false; });

  civicStore.nodes.current
    .on('mouseover', null)
    .on('mouseout', null)
    .on('click', null);
};

exports.drag = function (d) {
  civicStore.nodes.current
    .on('mouseover', null)
    .on('mouseout', null)
    .on('click', null);
};

exports.dragEnd = function (d) {
  d3
    .select(this)
    .classed("fixed", function(d) { d.fixed = true; });

  civicStore.nodes.current
    .on('mouseover', nodeHover)
    .on('mouseout',  offNode)
    .on('click',     click);
}
