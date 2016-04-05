'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('SearchResultsController', [ '$scope', '$state', 'grailsResource', function($scope, $state, resource) {
      console.log ("Running the controller");
      
      // Create a table container, and add to the DOM first.
      var table = $("<table class='table table-striped table-hover' width='100%' />");
      $('.search-results' ).html("").append(table);
      table.dataTable({
        pagingType: "full_numbers",
        processing: true,
        serverSide: true,
        searching: false,
        stateSave: true,
        localStorage: 60 * 60 * 72,
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
          
          // Use the grails helper to get the resources.
          return resource.query(data, function(response){
            callback(response);
          });
        },
        buttons: [
          {
            text: 'Add New',
            action: function ( e, dt, node, config ) {
              $state.go(".view", {id: 'create'}, {inherit: true});
            }
          }
        ]
      });
      
      // Fill the results.
      ;
    }]);
  }
);