var editForm = require("./edit-form");
var preFillFormA = require("../d3/pre-fill-form-a");

var prefillCurrent = function(obj) {
  editForm();
  preFillFormA(obj);
};

module.exports = prefillCurrent;
