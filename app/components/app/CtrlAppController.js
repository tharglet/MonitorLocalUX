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
    
    function setTitle () {
      if ($rootScope.$state.current.data && $rootScope.$state.current.data.title) {
        $rootScope.title = $rootScope.$state.current.data.title;
      }
      if ($rootScope.$state.current.data && $rootScope.$state.current.data.hasOwnProperty("subTitle")) {
        $rootScope.subTitle = $rootScope.$state.current.data.subTitle;
      }
    };
    setTitle();
    $rootScope.$on('$stateChangeSuccess', function() {
      setTitle();
    });

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