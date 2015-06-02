var d3 = require("d3");

var prefillCurrent = require("./prefill-current");

var editDisplayTmpl = require("../templates/edit-display.hbs");
var textDisplayTmpl = require("../templates/text-display.hbs");

var clickedHover = function(d) {

  // Adds the "add information" link and icon.
  d3.
    select("#edit")
    .html(editDisplayTmpl());

  // Send entity info to right side panel.
  // This is the equivalent of s = textDisplay(d)
  // FIXME: Go through textDisplay() to make template equivalent
  d3
    .select("#info")
    .html(textDisplayTmpl(d))
    .style("list-style", "square");

  // Edit icon:
  // Click prefills edit form with current entity's info
  // Mouseover shows pointer cursor and makes "Edit" visible
  // Mousemove drags "Edit" around (why?)
  // Mouseout hides "Edit"
  d3
    .selectAll("#editCurrentInfo")
    .on(
      "click",
      function() {
        // When the edit icon is clicked, we prefill the sidebar
        // with the current node's information
        prefillCurrent(d);
      }
    )
    .on(
      "mouseover",
      function() {
        d3
          .select(this)
          .style("cursor", "pointer");

        return d3
          .select("#editBox")
          .style("visibility", "visible");
      }
    )
    .on(
      "mousemove",
      function() {
        return d3
          .select("#editBox")
          .style("top", (d3.event.pageY + 4) + "px")
          .style("left", (d3.event.pageX + 16) + "px");
      }
    )
    .on("mouseout", function() {
      return d3
        .select("#editBox")
        .style("visibility", "hidden");
    });
}

module.exports = clickedHover;
