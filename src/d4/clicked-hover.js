var d3 = require('d3');

var editDisplayTmpl = require('../templates/edit-display.hbs');
var textDisplayTmpl = require("../templates/text-display.hbs");

var clickedHover = function(d) {

  // For editing the data displayed within the side panel.
  d3.
    select('#edit')
    .html(editDisplayTmpl(d));

  //  Printing to side panel within web application.
  d3
    .select('#info')
    .html(textDisplayTmpl(d))
    .style('list-style', 'square');

  d3
    .selectAll('#editCurrentInfo').on(
      'click',
      function() {
        prefillCurrent(d);
      }
    )
    .on(
      'mouseover',
      function() {
        d3
          .select(this)
          .style('cursor', 'pointer');

        return d3
          .select('#editBox')
          .style("visibility", "visible");
      }
    )
    .on(
      'mousemove',
      function() {
        return d3
          .select('#editBox')
          .style("top", (d3.event.pageY + 4) + "px")
          .style("left", (d3.event.pageX + 16) + "px");
      }
    )
    .on('mouseout', function() {
      return d3
        .select('#editBox')
        .style("visibility", "hidden");
    });
}

module.exports = clickedHover;
