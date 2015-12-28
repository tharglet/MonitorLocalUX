'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "auth",     // JS module name (not the same as the angular module name.)
  [],   // File locations can also be used instead of named includes.
  function () {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('auth', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  
        // State for search.
        $stateProvider.state('app.login', {
          templateUrl:  'components/auth/partials/login.html',
          url:          '/login',
          data : {
            title: "Login",
            requireLogin: false
          }
        });
        
      }])
    ;
  }
);
