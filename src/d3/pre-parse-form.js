var editForm = require('./edit-form');
var preFillFormA = require('./pre-fill-form-a');

var preParseForm = function (input) {
  input = input.toLowerCase();

  var entitiesHash = civicStore.nodes.byType;

  if (input in entitiesHash) {
    editForm();
    preFillFormA(entitiesHash[input]);
  }
}

module.exports = preParseForm;
