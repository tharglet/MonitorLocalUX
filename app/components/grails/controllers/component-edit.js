
'use strict';

define (
  ['notifications'],
  function (notify) {
    return function ($rootScope, $scope, context) {
      
      if (typeof $scope.context === 'undefined') {
        $scope.context = context;
        $scope.orginal_context = context;
      }
      
      // Set a couple of methods agains the scope.
      $scope.saveChanges = function() {
        
        // This is current scope of the button press.
        var res = this.context;
        if (res.id) {
          // Update...
          res.$update();
        } else {
          // Save new.
          res.$save();
        }
      };
      
      $scope.cancelChanges = function() {
      };
    };
  }
);