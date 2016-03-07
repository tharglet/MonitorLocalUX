'use strict';

define (
  ['app', 'search/SvcSearchService'],
  function(app) {
    app.registerController('SearchController', [ '$scope', 'SearchService', function($scope, search) {
      console.log ("Running the controller");
    }]);
  }
);