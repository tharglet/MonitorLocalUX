
'use strict';

define (
  ['notifications'],
  function (notify) {
    return function ($rootScope, $scope, context) {
      
      if (typeof $scope.context === 'undefined') {
        // Create a holder for the original model.
        $scope.orginal_context = {};
        angular.copy(context, $scope.orginal_context);
        
        // Now set the actual context against the scope.
        $scope.context = context;
      }
      
      // Set a couple of methods against the scope.
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
      
      $scope.cancelChanges = function(e) {
        
        // First we should reset teh model.
        angular.copy(this.orginal_context, this.context);
        
        // Set the form to pristine.
        if (e) {
          var form = angular.element(e.target).closest("form");
          if (form.length > 0) {
            var ctrl = form.controller('form');
            ctrl.$setPristine(true);
          }
        }
      };
    };
  }
);