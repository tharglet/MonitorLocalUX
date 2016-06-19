'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "auth",
  ['angular-ui-router'],
  function () {
    
    // Create our angular module here.
    return angular.module('auth', ['ui.router'])
      .config(['$stateProvider', function($stateProvider) {
        // State for Login.
        $stateProvider.state('app.login', {
          deps: ['auth/CtrlLoginController'],
          views : {
            "" : { // Un-named (default) view.
              controller: 'LoginCtrl',
              templateUrl: 'components/auth/partials/login.html',
            },
          },
          url: '^/login',
          data : {
            title: "Login",
            requireLogin: false
          },
        });
      }])
    ;
  }
);
