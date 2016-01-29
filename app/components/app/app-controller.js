'use strict';

define(
  [
   'app',                 // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
  ],
  function (app) {
    app.registerController("AppCtrl", ['$rootScope', '$scope', '$auth', '$log', 'UserService', function ($rootScope,$scope,$auth,$log,UserService) {
        if ($rootScope.$state.current) {
          // Add the states ass root classes.
          $rootScope.bodyClasses = $rootScope.$state.current.name.replace(/[\.\-]/ig, ' ').trim();
        }

        $rootScope.logout = function() {
          $auth.logout()
          .then(function(response) {
              delete $rootScope.currentUser;
              UserService.logout();
              $log.debug('Logged out');
              // $location.path('/');
          })
          .catch(function(err) {
              $log.error("failed to logout", err);
           });
        }
      }]);  
  }
);