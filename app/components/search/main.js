'use strict';
define(
  "search",
  [
   'angular-ui-router',
   'datatables.net-bs',
  ],
  function () {
    var mod = angular.module('search', ['ui.router']);
    mod.config(['$stateProvider', function($stateProvider) {
      $stateProvider.state('app.componentSearch', {
        abstract: true,
        deps: [
          "components/search/CtrlSearchController.js"
        ],
        data: {
          requirelogin:true,
        },
        controller: 'SearchController',
        views: {
          "@app" : {
            templateUrl: 'components/search/partials/search_results.html',
          }
        },        
      });
    }]);
    
    return mod;
  }
);
