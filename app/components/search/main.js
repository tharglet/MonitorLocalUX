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
        views: {
          "@": { // Reset the main un-named view of the app.
            templateUrl: 'components/search/partials/main.html',
          }
        }
      });
    }]);
    
    return mod;
  }
);
