'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('SearchResultsController', [ '$scope', '$state', 'grailsResource', function($scope, $state, resource) {
      var stateStringCache = {};
      
      var cols = [
        { 'data' : 'id', 'title': "#" },
        { 
          'data'        : 'name',
          'title'       : "Name",
          'render'    : function ( sData, type, oData, meta ) {
            if (type === 'display') {
              var val = "<a href='" + $state.href($state.current.name + ".view", {id: oData['id']}, {inherit: true}) + "'>"+sData+"</a>";
              return val;
            } else {
              return sData;
            }
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
      
      var getDTKey = function () {
        // Create a key for the state settings for the table.
        var s = $state.current;
        
        // Grab from cache.
        var key = stateStringCache[s.name];
        if (typeof key === 'undefined') {
          key = s.name;
          
          while (typeof s['parent'] !== 'undefined') {
            s = $state.get(s.parent);
            key += "-" + s.name;
          }
          stateStringCache[$state.current.name] = key;
        }
        
        return key;
      }
      
      // Create a table container, and add to the DOM first.
      var table = $("<table class='table table-striped table-hover' width='100%' />");
      $('.search-results' ).html("").append(table);
      table = table.DataTable({
        pagingType: "full_numbers",
        buttons: [
          {
            text: '<i class="glyphicon glyphicon-plus" ></i> Add',
            action: function ( e, dt, node, config ) {
              $state.go(".view", {id: 'create'}, {inherit: true});
            },
            className: 'btn-xs btn-primary'
          },
          { 
            extend: 'colvis',
            text: '<i class="glyphicon glyphicon-eye-close" ></i> Show/Hide Columns',
            className: 'btn-xs'
          },
        ],
        dom: '<"dt-button-groups"<"primary-buttons"B><"export-buttons">><"controls"lp>tip',
        processing: true,
        serverSide: true,
        searching: false,
        responsive: true,
        colReorder: true,
        stateSave: true,
        fixedHeader: true,
        stateSaveCallback: function(settings,data) {
          localStorage.setItem( 'SearchTable_' + getDTKey(), JSON.stringify(data) );
        },
        stateLoadCallback: function(settings) {
          return JSON.parse( localStorage.getItem( 'SearchTable_' + getDTKey() ) );
        },
        localStorage: 60 * 60 * 72,
        columns: cols,
        ajax : function (data, callback, settings) {
          
          // Use the grails helper to get the resources.
          // IAN:: Is this where we are dropping the Authorization Bearer token??
          // IAN2:: Does look like this one:: https://github.com/l-lin/angular-datatables/issues/279
          console.log("About to call resource.quey on %o %o ",resource,data);
          return resource.query(data, function(response){
            callback(response);
          });
        },
      });

      new $.fn.dataTable.Buttons(table, {
        buttons : [{
          extend: 'csv',
          className: 'btn-xs btn-info'
        }]
      });
      
      // Add exports.
      $('.export-buttons', table.table().container())
        .html("<span class='info' >Export as:&nbsp;</span>")
        .append(table.buttons( 1, null ).container())
      ;
      
    }]);
  }
);
