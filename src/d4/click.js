var d3 = require('d3');

var clickedHover = require('./clicked-hover');

var click = function (d) {
  civicStore.clearResetFlag = 0;

  var node = civicStore.nodes.node;

  var fundLink      = civicStore.links.funding;
  var investLink    = civicStore.links.investment;
  var collabLink    = civicStore.links.collaboration;
  var dataLink      = civicStore.links.data;

  var rawFundingConnections       = civicStore.edges.funding;
  var rawInvestmentConnections    = civicStore.edges.investment;
  var rawCollaborationConnections = civicStore.edges.collaboration;
  var rawDataConnections          = civicStore.edges.data;

  clickedHover(d);

  fundLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  investLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  collabLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  dataLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  node
    .style(
      "stroke",
      function(singleNode) {
        return (singleNode !== d) ? "white" : "black";
      }
    )
    .on('mouseout', null);

  node
    .filter(
      function(singleNode) {
        if (singleNode !== d) { return singleNode; }
      }
    )
    .on('mouseover', null);

  /**
   *  Get all neighboring link ids
   */
  var neighborsFunding = rawFundingConnections
    .filter(
      function (link) {
        return link.source.index === d.index ||
          link.target.index === d.index;
      }
    )
    .map(
      function (link) {
        return link.source.index === d.index ?
          link.target.index : link.source.index;
      }
    );

  var neighborsInvestment = rawInvestmentConnections
    .filter(
      function (link) {
        return link.source.index === d.index ||
          link.target.index === d.index;
      }
    )
    .map(
      function (link) {
        return link.source.index === d.index ?
          link.target.index : link.source.index;
      }
    );

  var neighborsCollaboration = rawCollaborationConnections
    .filter(
      function (link) {
        return link.source.index === d.index ||
          link.target.index === d.index;
      }
    )
    .map(
      function (link) {
        return link.source.index === d.index ?
          link.target.index : link.source.index;
      }
    );

  var neighborsData = rawDataConnections
    .filter(
      function (link) {
        return link.source.index === d.index ||
          link.target.index === d.index;
      }
    )
    .map(
      function (link) {
        return link.source.index === d.index ?
          link.target.index : link.source.index;
      }
    );

  console.log("neighborsData", neighborsData);

  civicStore.svg
    .selectAll('.node')
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(l) {
        return (
          neighborsFunding.indexOf(l.index) > -1 ||
          neighborsInvestment.indexOf(l.index) > -1 ||
          neighborsCollaboration.indexOf(l.index) > -1 ||
          neighborsData.indexOf(l.index) > -1 ||
          l === d
        ) ? 1 : 0.05;
      }
    )
    .select('text')
    .style('opacity', 1);


  node
    .filter(
      function(l) {
        return (
          neighborsFunding.indexOf(l.index) > -1 ||
          neighborsInvestment.indexOf(l.index) > -1 ||
          neighborsCollaboration.indexOf(l.index) > -1 ||
          neighborsData.indexOf(l.index) > -1 ||
          d === link
        )
      }
    )
    .on('mouseover', clickedHover)
    .on('click', function(l) {});
};

module.exports = click;
