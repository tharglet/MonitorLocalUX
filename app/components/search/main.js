'use strict';
define(
  "search",
  ['angular-ui-router'],
  function () {
    var mod = angular.module('search', ['ui.router']);
    mod.config(['$stateProvider', '$couchPotatoProvider', function($stateProvider) {
      $stateProvider.state('app.componentSearch', {
        abstract: true,
        data: {
          requirelogin:true,
        },
        templateUrl: 'components/search/partials/main.html',
      });
    }]);
    
    return mod;
  }
);
