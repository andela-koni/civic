var d3 = require('d3');
var _  = require('lodash');

var textDisplayTmpl = require("../templates/text-display.hbs");
var editDisplayTmpl = require("../templates/edit-display.hbs");

var nodeHover = function (d) {
  var showNodes = {};

  showNodes[d.id] = 1;  // FIXME: Why is this id and not index???

  d3.select('#edit')
    .html(editDisplayTmpl(d));

  d3.select('#info')
    .html(textDisplayTmpl(d))
    .style('list-style', 'square');

  _.chain(civicStore.links)
    .values()
    .flatten()
    .value()
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(link) {
        return (d === link.source || d === link.target) ? 1 : 0.05;
      }
    );

  _.chain(civicStore.edges)
    .values()
    .flatten()
    .value()
    .forEach(
      function(link) {
        if (d.index === link.source.index) {
          showNodes[link.source.index] = 1;
        }

        if (d.index === link.target.index) {
          showNodes[link.target.index] = 1;
        }
      }
    );

  d3
    .select(this)
    .style("stroke", civicStore.colors.translucent);

  civicStore.svg
    .selectAll('.entity')
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(n) { return (n.id in showNodes) ? 1 : 0.05 }
    )
    .select('text')
    .style('opacity', 1);

  d3
    .select(this.parentNode)
    .select("text")
    .transition()
    .duration(350)
    .delay(0)
    .style("opacity", 1)
    .style("font-weight", "bold");
};

module.exports = nodeHover;
