'use strict';

/**
 */
define(
  "dashboard",     // JS module name (not the same as the angular module name.)
  ['search'],   // File locations can also be used instead of named includes.
    // Create our angular module here.
  function(){
    return angular.module('dashboard', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

        // Default config for un-named view.
        $stateProvider.state('app.home', {
        	
        	url: '/',
          templateUrl: 'components/dashboard/partials/view.html',
          data : {
              title: "Dashboard from controller",
              subtitle: 'Some dashboard subtitle suub',
              requireLogin: true
          },
          controller: ['$scope', '$state', function ($scope, $state) {
        	  console.log('execute dashboard controller');
          }]
        });
      }])
    ;
  }
);
