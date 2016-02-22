'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "auth",
  ['angular'],
  function () {
    
    // Create our angular module here.
    return angular.module('auth', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
        // State for Login.
        $stateProvider.state('app.login', {
          templateUrl:  './partials/login.html',
          url:          '/login',
          controller: 'LoginCtrl',
          data : {
            title: "Login",
            requireLogin: false
          }
        });
      }])
    ;
  }
);