'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('SearchResultsController', [ '$scope', '$state', 'grailsResource', function($scope, $state, resource) {
      console.log ("SearchResultsController");
      
      var cols = [
        { 'data' : 'id', 'title': "#" },
        { 
          'data'        : 'name',
          'title'       : "Name",
          'createdCell' : function (nTd, sData, oData, iRow, iCol) {
            $(nTd).html("<a href='" + $state.href($state.current.name + ".view", {id: oData['id']}, {inherit: true}) + "'>"+sData+"</a>");
          }
        }
      ];
      if (typeof $state.current.searchFields !== "undefined") {
        var extras = [];
        if (typeof $state.current.searchFields === 'function') {
          // Use the return of the function
          extras = $state.current.searchFields();
        } else {

          // Use the value
          extras = $state.current.searchFields;
        }
        
        angular.forEach (extras, function(val) {
          cols.push ( val );
        });
      }
      
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
        columns: cols,
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
      ;
    }]);
  }
);