var $ = require('jquery');

var processFormB = require('./process-form-b');
var displayFormC = require('./display-form-c');

var displayFormCSendJson = function (obj) {
  var formObj = processFormB(obj);

  if (formObj.funding_given) {
    _.each(formObj.funding_given, function(f, i) {
      formObj.funding_given[i].id = civicStore.lookup[f.name];
    })
  }

  displayFormC();

  console.log("formObj after", formObj);

  // d3.xhr.post('/entities').data(formObj).on("success", callback);

  // $.ajax({
  //   type: 'POST',
  //   data: $.param(formObj),
  //   url: '/database/save',
  //   crossDomain: true
  // }).done(function(returnData) {
  //   console.log("Returning from AJAX POST to /database/save with returnData =", returnData);
  //   // TODO: ???
  // });
  var formObj = {
    name: 'kenny',
    age: 26
  };

  d3.xhr('/entities')
    .header("Content-Type", "application/json")
    .post(
      JSON.stringify(formObj),
      function(err, rawData){
        var data = JSON.parse(rawData);
        console.log("got response", data);
      }
    );
};

// displayFormCSendJson();

module.exports = displayFormCSendJson;
