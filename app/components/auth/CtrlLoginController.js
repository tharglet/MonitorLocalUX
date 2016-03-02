'use strict';

define (
  ['app', './SvcUserService'],
  function(app) {
    app.registerController('LoginCtrl', [ '$scope', '$auth', '$log', 'UserService', function($scope, $auth, $log, UserService) {
      $scope.alerts = [];
    
      $scope.authenticate = function(provider) {
        $log.debug("Authenticate");
        $auth.authenticate(provider)
        .then(function(response) {
          $log.debug("result of auth: %o", response);
          if (response && response.data && response.data.user) {
            $log.debug("Set rootScope(%o) user to %o", $scope, response.data.user);
    
            $scope.currentUser = UserService.login(response.data.user);
            if ($scope.pendingPath) {
              $log.debug('send user back to %o', $scope.pendingPath);
    
              // $location.path($scope.pendingPath.originalPath);
              delete $scope.pendingPath;
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
          // delete $scope.currentUser;
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
