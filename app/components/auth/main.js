'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "auth",
  ['angular-ui-router', 'angular-couch-potato'],
  function () {
    
    // Create our angular module here.
    return angular.module('auth', ['ui.router'])
      .config(['$stateProvider', '$couchPotatoProvider', function($stateProvider, $couchPotatoProvider) {
  
        // State for Login.
        $stateProvider.state('app.login', {
          templateUrl:  './partials/login.html',
          url:          '/login',
          data : {
            title: "Login",
            requireLogin: false
          },
          controller: 'LoginCtrl',
          resolve: {
            // This is the important bit that loads a file when this route is in action. These files are only loaded when needed.
            deps: $couchPotatoProvider.resolveDependencies([
              'auth/CtrlLoginController'
            ])
          },
        });
      }])
    ;
  }
);