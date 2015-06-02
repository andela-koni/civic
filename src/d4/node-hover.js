var d3 = require('d3');
var _  = require('lodash');

var textDisplayTmpl = require("../templates/text-display.hbs");
var editDisplayTmpl = require("../templates/edit-display.hbs");

var nodeHover = function (d) {
  var fundLink   = civicStore.links.funding;
  var investLink = civicStore.links.investment;
  var collabLink = civicStore.links.collaboration;
  var dataLink   = civicStore.links.dataLink;

  var fundingConnections       = civicStore.nodes.funding;
  var investmentConnections    = civicStore.nodes.investment;
  var collaborationConnections = civicStore.nodes.collaboration;
  var dataConnections          = civicStore.nodes.data;

  d3.select('#edit')
    .html(editDisplayTmpl(d));

  d3.select('#info')
    .html(textDisplayTmpl(d))
    .style('list-style', 'square');

  fundLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function (l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  investLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function (l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  collabLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function (l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  dataLink
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function (l) {
        return (d === l.source || d === l.target) ? 1 : 0.05;
      }
    );

  var neighborNodeIndices = {};
  neighborNodeIndices[d.id] = 1;  // FIXME: Why is this id and not index???

  fundingConnections.forEach(
    function (link) {
      if (link.source.index === d.index) {
        neighborNodeIndices[link.target.index] = 1;
      }
      if (link.target.index === d.index) {
        neighborNodeIndices[link.sourc.index] = 1;
      }
    }
  );

  investmentConnections.forEach(
    function (link) {
      if (link.source.index === d.index) {
        neighborNodeIndices[link.target.index] = 1;
      }
      if (link.target.index === d.index) {
        neighborNodeIndices[link.sourc.index] = 1;
      }
    }
  );

  collaborationConnections.forEach(
    function (link) {
      if (link.source.index === d.index) {
        neighborNodeIndices[link.target.index] = 1;
      }
      if (link.target.index === d.index) {
        neighborNodeIndices[link.sourc.index] = 1;
      }
    }
  );

  dataConnections.forEach(
    function (link) {
      if (link.source.index === d.index) {
        neighborNodeIndices[link.target.index] = 1;
      }
      if (link.target.index === d.index) {
        neighborNodeIndices[link.sourc.index] = 1;
      }
    }
  );

  d3
    .select(this)
    .style("stroke", civicStore.colors.translucent);

  civicStore.svg
    .selectAll('.node')
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(n) { return (n.id in neighborNodeIndices) ? 1 : 0.05 }
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
