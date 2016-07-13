'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('LoginCtrl', [ '$rootScope', '$auth', '$log', '$state', 'userService', function($scope, $auth, $log, $state, userService) {

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
            } else {
              $state.go("app.dash");
            }
          }
        })
        .catch(function(err) {
          $scope.alerts = [{type: 'danger', message: 'Login failed'}];
          $log.debug("login failed", err);
        });
      };
    }]);
  }
);
