var d3 = require('d3');

var resize = function () {

  var network = d3.select('#network');
  var container = network.node().parentNode;
  var width = container.getBoundingClientRect().width;
  var height = width /
    (civicStore.dimensions.width / civicStore.dimensions.height);

  network.attr('width', Math.round(width));
  network.attr('height', Math.round(height));
};

module.exports = resize;
