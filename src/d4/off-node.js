var d3 = require('d3');

var nodeHover = require('./node-hover');
var click     = require('./click');

var offNode = function (d) {
  var node   = civicStore.nodes.current;
  var links  = civicStore.links;
  var colors = civicStore.colors.node;
  var byType = civicStore.nodes.byType;
  var most   = civicStore.nodes.mostConnected;

  node
    .style("stroke", "white")
    .on('mouseover', nodeHover)
    .on('mouseout',  offNode)
    .on('click',     click);

  _.keys(links)
    .forEach(
      function(link) {
        links[link]
          .transition()
          .duration(350)
          .delay(0)
          .style("stroke", colors[link])
          .style("opacity", "0.2")
          .style("stroke-width", "1px");
      }
    );

  d3
    .selectAll('.entity')
    .transition()
    .duration(350)
    .delay(0)
    .style("opacity", "1");

  d3
    .selectAll('.entity')
    .selectAll('text')
    .transition()
    .duration(350)
    .delay(0)
    .style(
      'opacity',
      function(d) {
        return most[d.entity_type].hasOwnProperty(d.name) ? 1 : 0;
      }
    )
    .style('font-size', '14px')
    .style('font-weight', 'normal');
};

module.exports = offNode;
