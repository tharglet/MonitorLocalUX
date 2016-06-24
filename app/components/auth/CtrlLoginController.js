'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('LoginCtrl', [ '$rootScope', '$auth', '$log', 'userService', function($scope, $auth, $log, userService) {

      $scope.alerts = [];

      console.log("auth Controller");
    
      $scope.authenticate = function(provider) {
        $log.debug("Authenticate");
        $auth.authenticate(provider).then(function(response) {
          $log.debug("result of auth: %o", response);
          if (response && response.data && response.data.user) {
            $log.debug("Set rootScope(%o) user to %o", $scope, response.data.user);
    
            userService.update(response.data.user);
            if ($scope.loginRedirect) {
              // Transition.
              $state.go($scope.loginRedirect.state, $scope.loginRedirect.params);
              delete $scope.loginRedirect;
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
           userService.logout();
          $log.debug('Logged out');
        })
        .catch(function(err) {
          $log.error("failed to logout", err);
        });
      };
    }]);
  }
);
