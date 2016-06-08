'use strict';
define(
  "search",
  [
   'angular-ui-router',
   'datatables.net-bs',
   'datatables.net-buttons-bs',
   'datatables.net-colreorder',
   'datatables.net-responsive-bs',
   'grails'
  ],
  function () {
    var mod = angular.module('search', ['ui.router', 'grails']);
    mod.config(['$stateProvider', function($stateProvider) {
      $stateProvider.state('app.componentSearch', {
        abstract: true,
        deps: [
          "components/search/CtrlSearchController.js",
          "components/search/CtrlSearchResultsController.js"
        ],
        data: {
          requirelogin:true,
        },
        views: {
          // Unnamed view at app state level...
          "@app" : {
            templateUrl: 'components/search/partials/search_results.html'
          }
        },        
      });
    }]);
    
    return mod;
  }
);
