'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('SearchResultsController', [ '$scope', '$state', 'GrailsService', 'appConfig', function($scope, $state, grails, config) {
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
          var ao = grails.r ( config.backend, 'AcademicOutput');
          ao.list(function(data){
            callback({ 'data': data });
          });
        }
      });
      
      // Fill the results.
      $('.search-results' ).html (table);
    }]);
  }
);