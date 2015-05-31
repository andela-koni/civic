var d3 = require('d3');
var _  = require('underscore');

var wrap = function(text, width) {

  text.each(function() {
    var text = d3.select(this);
    var words = text.text().split(/\s+/).reverse();
    var word;
    var line = [];
    var lineNumber = 0;
    var lineHeight = 1.1; // ems
    var dy = parseFloat(text.attr("dy"));
    var data = d3.select(this)[0][0].__data__;

    var tspan = text
      .text(null)
      .append("tspan")
      .attr("x", 0)
      .attr(
        "y",
        function() {
          return data.employees ?
            civicStore.scale.employee(data.employees) + 10 : 17;
        }
      )
      .attr("dy", dy + "em");


    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));

      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        lineNumber++;

        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr(
            "y",
            function() {
              return data.employees ?
                civicStore.scale.employee(data.employees) + 5 : 12;
            }
          )
          .attr("dy", lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
};

module.exports = wrap;
