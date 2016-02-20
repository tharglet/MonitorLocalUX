'use strict';

define (
  ['app', './SvcUserService'],
  function(app) {
    app.registerController('LoginCtrl', [ '$scope', '$auth', '$rootScope', '$log', 'UserService', function($scope, $auth, $rootScope, $log, UserService) {
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
    }]);
  }
);
