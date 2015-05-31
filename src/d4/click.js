var d3 = require('d3');

var clickedHover = require('./clicked-hover');

var click = function (d) {
  civicStore.clearResetFlag = 0;

  var node = civicStore.nodes.current;

  clickedHover(d);

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
  var neighbors = _.chain(civicStore.edges)
    .values()
    .flatten()
    .value()
    .filter(
      function (link) {
        return d.index === link.source.index ||
          d.index === link.target.index;
      }
    )
    .map(
      function (link) {
        return d.index === link.source.index ?
          link.source.index :
          link.target.index;
      }
    )

  civicStore.svg
    .selectAll('.entity')
    .transition()
    .duration(350)
    .delay(0)
    .style(
      "opacity",
      function(link) {
        return (link.index in neighbors || d === link) ? 1 : 0.05;
      }
    )
    .select('text')
    .style('opacity', 1);


  node
    .filter(function(link) { return (link.index in neighbors || d === link) })
    .on('mouseover', handleClickNodeHover)
    .on('click', function(l) {});
};

module.exports = click;
