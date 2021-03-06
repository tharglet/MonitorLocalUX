
'use strict';

define (
  ['notifications'],
  function () {
    return function ($scope, $injector, context) {
      
      // Get the router state provider if present.
      var $state = $injector.has('$state') ? $injector.get('$state') : null;
      
      // Add a "filers" element for none binding filter values.
      $scope.filters = {};
      
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
          return res.getBlankProperty(propertyName).then( function( blank ) {
            // console.log('Injecting context values and defaults, prop is %o blank=%o',propertyName,blank)
            // If the blank has an ownerInstitution property, set it
            
            // if ( ( $scope.application.user ) && ( $scope.application.user.userOrg ) ) {
            //   blank.ownerInstitution = $scope.application.user.userOrg;
            // }  else {
            // }
            // console.log("returning the blank %o",blank);
            return blank;
          });
        }
        
        // Just return null.
        return null;
      };
      
      $scope.addBlank = function (propertyName) {
        
        // The resource.
        var res = $scope.context;
        
        // Only add if we can push to it.
        if (res[propertyName] && typeof res[propertyName].push === 'function' ) {
          return $scope.getBlank(propertyName).then(function ( blank ) {
            $scope.addTo( propertyName, blank );
          });
        }
        
        return null;
      };
      
      $scope.addTo = function (propertyName, item) {
        $scope.context[propertyName].push( item );
      };
      
      $scope.removeFrom = function (propertyName, item) {
        
        // The resource.
        var res = $scope.context;
        
        // Only add if we can push to it.
        if (res[propertyName] && typeof res[propertyName].splice === 'function' ) {
          var index = res[propertyName].indexOf(item);
          res[propertyName].splice(index, 1);
        }
      };
      
      $scope.cancelEditMultiProperty = function (item) {
        
        // Grab the original.
        var _orig = item.$$original;
        
        // We should now remove it from the element.
        delete item.$$original;
        
        // Restore the original.
        angular.copy(_orig, item);
        $scope.setEditFlagFor (item, false);
      };
      
      $scope.confirmEditMultiProperty = function (item) {
        $scope.setEditFlagFor (item, false);
      };
      
      $scope.editMultiProperty = function (item) {
        
        // Get the current value.
        var _orig = {};
        
        // Copy to our object.
        angular.copy(item, _orig);
        
        // Now that we have a copy we can save the copy. Important to copy first so we don't try to copy the copy.
        item.$$original = _orig;
        
        this.setEditFlagFor (item, true);
      };
      
      $scope.setEditFlagFor = function (item, value) {
        
        // The resource.
        var res = $scope.context;
        
        // Just concat the index and prop name.
        item['$editMode'] = value;
      };
      
      // Set a couple of methods against the scope.
      $scope.saveChanges = function() {
        
        // This is current scope of the button press.
        var res = this.context;
        if (res.id) {
          // Update...
          res.$update(function(){
            $state.reload();
          });
        } else {
          // Save new.
          res.$save(function(){
            
            if ($state && res.id) {
              // Refresh the current state. Helps with passed references into directives.
              $state.go($state.current, {id: res.id});
            }
          });
        }
      };
      
      // Set a couple of methods against the scope.
      $scope.deleteObject = function(callback) {
        
        // This is current scope of the button press.
        var res = this.context;
        if (res.id) {
          // Delete...
          res.$delete(function(){
            if ($state) {
              $state.go("^", {}, {inherit: true});
            }
            
            // If we have a callback then execute that here too.
            if (typeof callback === 'function') {
              callback(res);
            }
          });
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
