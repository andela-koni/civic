var d3 = require('d3');

var nodeHover = require('./node-hover');
var click     = require('./click');

var offNode = function (d) {
  var node          = civicStore.nodes.node;
  var fundLink      = civicStore.links.funding;
  var investLink    = civicStore.links.investment;
  var collabLink    = civicStore.links.collaboration;
  var dataLink      = civicStore.links.data;
  var fmcForProfit  = civicStore.nodes.mostConnected.forProfit;
  var fmcNonProfit  = civicStore.nodes.mostConnected.nonProfit;
  var fmcGovernment = civicStore.nodes.mostConnected.government;
  var fmcIndividual = civicStore.nodes.mostConnected.individual;

  node
    .style("stroke", civicStore.colors.white)
    .on('mouseover', nodeHover)
    .on('mouseout',  offNode)
    .on('click',     click);

  fundLink
    .transition()
    .duration(350)
    .delay(0)
    .style("stroke", civicStore.colors.node.funding)
    .style("opacity", "0.2")
    .style("stroke-width", "1px");

  investLink
    .transition()
    .duration(350)
    .delay(0)
    .style("stroke", civicStore.colors.node.investment)
    .style("opacity", "0.2")
    .style("stroke-width", "1px");

  collabLink
    .transition()
    .duration(350)
    .delay(0)
    .style("stroke", civicStore.colors.node.collaboration)
    .style("opacity", "0.2")
    .style("stroke-width", "1px");

  dataLink
    .transition()
    .duration(350)
    .delay(0)
    .style("stroke", civicStore.colors.node.data)
    .style("opacity", "0.2")
    .style("stroke-width", "1px");

  d3
    .selectAll('.node')
    .transition()
    .duration(350)
    .delay(0)
    .style("opacity", "1");

  d3
    .selectAll('.node')
    .selectAll('text')
    .transition()
    .duration(350)
    .delay(0)
    .style(
      'opacity',
      function(d) {
        switch (d.entity_type) {
          case "For-Profit":
            return fmcForProfit.hasOwnProperty(d.name) ? 1 : 0;
            break;
          case "Non-Profit":
            return fmcNonProfit.hasOwnProperty(d.name) ? 1 : 0;
            break;
          case "Government":
            return fmcGovernment.hasOwnProperty(d.name) ? 1 : 0;
            break;
          case "Individual":
            return fmcIndividual.hasOwnProperty(d.name) ? 1 : 0;
            break;
        }
      }
    )
    .style('font-size', '14px')
    .style('font-weight', 'normal');
};

module.exports = offNode;
