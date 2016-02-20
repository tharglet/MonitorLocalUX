'use strict';

define (
['app','auth/SvcUserService'],
function(app) {
  return  app.registerController ('AppController', ['$rootScope', '$scope', '$auth', '$log', 'UserService', function ($rootScope,$scope,$auth,$log,UserService) {

    console.log ("Default controller for app state.");
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
    };
  }]);
});