
'use strict';

define (
  ['notifications'],
  function (notify) {
    return function ($rootScope, $scope, $state, $stateParams, $timeout, resource) {
      
      // Use this to avoid catching the first model load with our watcher.
      var initializing = true;
      
      // Hold the $scope.context_original value of the content.
      $scope.context_original = {};
      
      // This boolean will be used to track the status of the context object.
      var changed = false;
      
      $scope.context = {};
    
      var watcher = null;
      var replaceWatcher = function(observe, newWatcher) {
        console.log ("replaceWatcher");
        // Always remove any existing listeners.
        if (typeof watcher === 'function') {
          watcher();
        }
        
        if (typeof observe === 'string' && typeof newWatcher === 'function') {
          console.log ("Binding watcher");
          watcher = $scope.$watch(observe, newWatcher, true);
        } else {
          watcher = null;
        }
      };
      
      // Listener function for watching the context. Calling the return method will remove the current watcher.
      var watchingFunction = function() {
        
        if (initializing) {
          console.log ("watchingFunction initial run");
          $timeout(function() { initializing = false; });
        } else {
          console.log ("watchingFunction");
          // We only need to watch for the first change.
          
          // Raise the notification.
//          changed = notify.showSaveNotification({
//            text: 'You have made changes to this Academic Output. Your changes will not be saved until you click save.'
//          }, saveMethod, cancelMethod);
          
          // Remove the listener as we now have no need to watch it so closely.
          replaceWatcher();
        }
      };
      
      var updateContext = function (data) {
        console.log ("UpdateContext");
        
        // We also create a copy for reverting.
        $scope.context_original = angular.copy(data);

        if (data) {
          $scope.context = data;
        }
        
        if ($scope.context.name) {
          $rootScope.secondaryTitle = $scope.context.name;
        }
        
        // Bind a new listener to the returned object.
        replaceWatcher ('context', watchingFunction);
        
        // Reset the watched flag.
        changed = false;
      };
      
      var saveMethod = function() {
        
        // Persist any changes back to the server.
        if (changed !== false) {
          // Close the notification.
//          changed.close();
        }
        
        // This is current scope of the button press.
        var res = this.context;
        if (res.id) {
          // Update...
          this.context.$update();
        } else {
          // Save new.
          this.context.$save();
        }
      };
      
      var cancelMethod = function() {
        // Revert the changes...
        if ($scope.context_original) {
          updateContext($scope.context_original);
          if (changed !== false) {
            // Close the notification.
            changed.close();
          }
        }
      };
      
      /**** First run ****/
      if ($stateParams.id) {      
        
        // Change the title if we get a new one here.
        resource.get($stateParams, function(data) {
          updateContext (data);
          $scope.typeList = data.type.owner.values;
        });
        
        // Destroy listener to perform some cleanup on this scope.
        $scope.$on('$destroy', function() {
          $rootScope.secondaryTitle = null;
          $scope.context = null;
          $scope.context_original = null;
          
          // Remove the watcher...
          replaceWatcher();
        });
        
        
        /*** Bind some function to the scope at the end ***/
        $scope.saveChanges = saveMethod;
        $scope.cancelChanges = cancelMethod;
      }
    };
  }
);