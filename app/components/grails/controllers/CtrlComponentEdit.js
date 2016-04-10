
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
      
      $scope.getBlank = function (propertyName) {
        
        // The resource.
        var res = this.context;
        
        if (res && "getBlankProperty" in res && typeof res.getBlankProperty === 'function') {
          return res.getBlankProperty(propertyName);
        }
        
        // Just return null.
        return null;
      };
      
      $scope.addBlank = function (propertyName) {
        
        // The resource.
        var res = $scope.context;
        
        // Only add if we can push to it.
        if (res[propertyName] && typeof res[propertyName].push === 'function' ) {
          $scope.getBlank(propertyName).then(function ( blank ) {
            $scope.context[propertyName].push( blank );
          });
        }
      };
      
      $scope.removeFrom = function (propertyName, index) {
        
        // The resource.
        var res = $scope.context;
        
        // Only add if we can push to it.
        if (res[propertyName] && typeof res[propertyName].splice === 'function' ) {
          res[propertyName].splice(index, 1);
        }
      };
      
      $scope.cancelEditMultiProperty = function (propertyName, index) {
        
        // The resource.
        var res = $scope.context;
        var item = res[propertyName][index];
        
        // Grab the original.
        var _orig = item.$$original;
        
        // We should now remove it from the element.
        delete item.$$original;
        
        // Restore the original.
        angular.copy(_orig, item);
        $scope.setEditFlagFor (propertyName, index, false);
      };
      
      $scope.confirmEditMultiProperty = function (propertyName, index) {
        $scope.setEditFlagFor (propertyName, index, false);
      };
      
      $scope.editMultiProperty = function (propertyName, index) {
        
        // The resource.
        var res = $scope.context;
        
        // Get the current value.
        var _orig = {};
        var item = res[propertyName][index];
        
        // Copy to our object.
        angular.copy(item, _orig);
        
        // Now that we have a copy we can save the copy. Important to copy first so we don't try to copy the copy.
        item.$$original = _orig;
        
        $scope.setEditFlagFor (propertyName, index, true);
      };
      
      $scope.setEditFlagFor = function (propertyName, index, value) {
        
        // The resource.
        var res = $scope.context;
        
        // Just concat the index and prop name.
        res[propertyName][index]['$editMode'] = value;
      };
      
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