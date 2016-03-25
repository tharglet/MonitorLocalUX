'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('SearchResultsController', [ '$scope', '$state', 'grailsResource', function($scope, $state, resource) {
      console.log ("Running the controller");
      
      var table = $("<table class='table table-striped table-hover' width='100%' />").dataTable({
        columns: [
          { 'data' : 'id', title: "#" },
          { 
            'data'  : 'name',
            'title' : "Name",
            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html("<a href='" + $state.href($state.current.name + ".view", {id: oData['id']}, {inherit: true}) + "'>"+sData+"</a>");
            }
          }
        ],
        ajax : function (data, callback, settings) {
          
          // Use the grails helper to get the resource.
          resource.list(function(data){
            callback({ 'data': data });
          });
        }
      });
      
      // Fill the results.
      $('.search-results' ).html (table);
    }]);
  }
);