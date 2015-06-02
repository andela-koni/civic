var d3 = require("d3");
var $  = require("jquery");

var u = require("../utilities");

// Templates
var resetFormTmpl = require("../templates/reset-form.hbs");
var formATmpl     = require("../templates/form-a.hbs");

var editForm = function () {
  var node = civicStore.nodes.node;
  var entitiesHash = civicStore.lookups.byName;

  // Change the Add Information link to Reset Form
  d3
    .select('#edit-add-info')
    .html(resetFormTmpl())
    .on('click', editForm);

  node.on("mouseover", null);

  // Insert the first page of the form
  d3.select("#info").html(formATmpl());

  d3.select("input#name").on(
    "keyup",
    function() {
      if (this.value in entitiesHash) {
        editForm();
        preFillFormA(entitiesHash[this.value]);       // TODO: preFillFormA
      }
    });

};

module.exports = editForm;
