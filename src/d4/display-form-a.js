var _ = require("lodash");
var $ = require("jquery");

var formATmpl = require("../templates/form-a.hbs");

var displayFormA = function (entity) {
  var obj = _.cloneDeep(entity);

  obj.isForProfit     = (obj.entity_type === "For-Profit");
  obj.isNonProfit     = (obj.entity_type === "Non-Profit");
  obj.isGovernment    = (obj.entity_type === "Government");
  obj.isIndividual    = (obj.entity_type === "Individual");

  // insert into #form formATmpl(obj);

  $()
}

module.exports = displayFormA;
