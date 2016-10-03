'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('ProfileController', ['$rootScope', '$scope', 'userService', 'context', '$controller', '$state', function($rootScope, $scope, userService, context, $controller, $state) {
      
      // Initialize the super class and extend it.
      angular.extend(this, $controller('GrailsEditController', {
        $scope: $scope,
        context: context
      }));
      
      // We can also exchange the application user object for this Resource.
      $scope.saveChanges = function() {
        
        // This is current scope of the button press.
        var res = this.context;
        if (res.id) {
          // Update...
          res.$update(function(){
            // Ensure the username gets updated.
            angular.copy({}, $rootScope.application);
            $state.reload();
          });
        }
      };
    }]);
  }
);
