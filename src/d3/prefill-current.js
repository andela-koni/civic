var editForm = require('./edit-form');
var preFillFormA = require('./pre-fill-form-a');

var prefillCurrent = function(obj) {
  console.log("Running prefilCurrent!");
  editForm();
  preFillFormA(obj);
};

module.exports = prefillCurrent;
