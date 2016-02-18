'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "auth",     // JS module name (not the same as the angular module name.)
  ['monitor-user-services'],   // File locations can also be used instead of named includes.
  function () {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('auth', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  
        // State for search.
        $stateProvider.state('app.login', {
          templateUrl:  'components/auth/partials/login.html',
          url:          '/login',
          controller: 'LoginCtrl',
          data : {
            title: "Login",
            requireLogin: false
          }
        })
        ;

      }])
      // .controller('LoginCtrl', [ '$scope', '$auth', '$rootScope', '$location', '$log', 'UserService', function($scope, $auth, $rootScope, $location, $log, UserService) {
      .controller('LoginCtrl', [ '$scope', '$auth', '$rootScope', '$log', 'UserService', function($scope, $auth, $rootScope, $log, UserService) {
        $scope.alerts = [];

        $scope.authenticate = function(provider) {
            $log.debug("Authenticate");
            $auth.authenticate(provider)
            .then(function(response) {
                $log.debug("result of auth: %o", response);
                if (response && response.data && response.data.user) {
                    $log.debug("Set rootScope(%o) user to %o", $rootScope, response.data.user);

                    $rootScope.currentUser = UserService.login(response.data.user);
                    if ($rootScope.pendingPath) {
                        $log.debug('send user back to %o', $rootScope.pendingPath);

                        // $location.path($rootScope.pendingPath.originalPath);
                        delete $rootScope.pendingPath;
                    }
                }
            })
            .catch(function(err) {
                $scope.alerts = [{type: 'danger', message: 'Login failed'}];
                $log.debug("login failed", err);
            });
        };

        $scope.logout = function() {
          $auth.logout()
            .then(function(response) {
              // delete $rootScope.currentUser;
              // userService.logout();
              $log.debug('Logged out');
            })
            .catch(function(err) {
              $log.error("failed to logout", err);
            });

        };

      }])
    ;
  }
);
