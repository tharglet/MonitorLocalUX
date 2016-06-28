'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "auth",
  [ './PrvdUserServiceProvider', './DrtvUserCanAccessState', 'angular-ui-router'],
  function (userServiceProvider, accessStateDirective) {
    
    // Create our angular module here.
    return angular.module('auth', ['ui.router'])
    
      // Register the user service against this module too.
      .provider('userService',  userServiceProvider)
      
      // Directive for checking user access.
      .directive('kintAccessState', ['$compile', '$animate', 'userService', accessStateDirective])
    
      .config(['$stateProvider', '$httpProvider', '$injector', function($stateProvider, $httpProvider, $injector) {
        
        $stateProvider.decorator('authRequired', function (state) {
            return state.authRequired ? state.authRequired : false;
        });
        
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
        
        $httpProvider.interceptors.push(['$q', '$injector',  function($q, $injector) {
          return {
            responseError: function(error) {

              switch (error.status) {
              case 401:
                $injector.get('$state').transitionTo('app.login');
                break;
              }

              // We should still reject the request.
              return $q.reject(error);
            },
           };
        }]);
      }])
      
      .run(['$rootScope', 'userService', '$state', function($rootScope, userService, $state) {
        
        var checkLoginPage = function(from, fromParams, to) {
          if (to.name == 'app.login' && !from.name == 'app.login') {
            // Save the state ref for redirect on successful login.
            $rootScope.loginRedirect = {
                state: from,
                params: fromParams
            }
          }
        };
        
        // Capture the state-change event and decide whether the current user has access to this state or not.
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {
          
          checkLoginPage (fromState, fromParams, toState);
          if (userService.checkAccess ( toState.authRequired ) === false) {
            
            // Stop the state change happening...
            e.preventDefault();
            
            // Transition to the login state.
            $state.transitionTo('app.login');
          }
        });
        
        // Listen for error on state change. Resolves failing because of a 401 will not be caught.
        $rootScope.$on('$stateChangeError',  function(event, toState, toParams, fromState, fromParams, error){
          var theError = error;
          console.log(error);
        });
      }])
    ;
  }
);
