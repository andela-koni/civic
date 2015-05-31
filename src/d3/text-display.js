var d3              = require('d3');
var textDisplayTmpl = require("../templates/text-display.hbs");

var textDisplay = function(d) {
  return textDisplayTmpl(d);
};

module.exports = textDisplay;
