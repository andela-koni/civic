var d3 = require('d3');
var $  = require('jquery');

var resize = function () {

  var network = $('#network');
  var container = network.parent();
  var targetWidth = container.width();
  // with width and height = 1000, aspect is 1
  // var aspect = 1;
  // var targetHeight = targetWidth / aspect;

  network.attr('width', targetWidth);
  network.attr('height', targetWidth);
};

module.exports = resize;
