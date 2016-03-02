'use strict';

define (
['app','auth/SvcUserService'],
function(app) {
  return  app.registerController ('AppController', ['$rootScope', '$scope', '$auth', '$log', '$state', '$couchPotato', 'UserService', function ($rootScope, $scope, $auth, $log, $stateProvider, $couchPotatoProvider, UserService) {

    /**
     * Method to set the title.
     */
    function setTitle () {
      if ($rootScope.$state.current.data && $rootScope.$state.current.data.title) {
        $rootScope.title = $rootScope.$state.current.data.title;
      }
      if ($rootScope.$state.current.data && $rootScope.$state.current.data.hasOwnProperty("subTitle")) {
        $rootScope.subTitle = $rootScope.$state.current.data.subTitle;
      }
    };
    
    if ($rootScope.$state.current) {
      // Add the states ass root classes.
      $rootScope.bodyClasses = $rootScope.$state.current.name.replace(/[\.\-]/ig, ' ').trim();
    }
    
    setTitle();
    $rootScope.$on('$stateChangeSuccess', function() {
      setTitle();
    });
  }]);
});