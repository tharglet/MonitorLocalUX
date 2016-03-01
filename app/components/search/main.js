'use strict';
define(
  "search",
  ['angular-ui-router', 'angular-couch-potato'],
  function () {    
    var mod = angular.module('search', ['ui.router', 'scs.couch-potato']);
    mod.config(['$stateProvider', '$couchPotatoProvider', function($stateProvider,$couchPotatoProvider) {
      $stateProvider.state('app.componentSearch', {
        abstract: true,
        data: {
          requirelogin:true,
        },
      });
    }]);
    
    return mod;
    
    
//    return angular.module('search', ['ui.router']).config(['$state', function ($state) {
//      console.log ("Config search!");
//                      
//      // Default config for un-named view.
//      $stateProvider.state('app.search', {
//        url: "/search",
//        templateUrl:  'components/search/partials/main.html',
//      });
//    }]);
  }
);
