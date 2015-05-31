var d3 = require('d3');

var dragStart = function (target) {
  d3
    .select(this)
    .classed(
      "fixed",
      function(target) { target.fixed = false; }
    );

  window.node
    .on('mouseover', null)
    .on('mouseout', null)
    .on('click', null);
};

module.exports = dragStart;
