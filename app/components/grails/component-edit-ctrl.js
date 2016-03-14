function ComponentEditController ($rootScope, $scope, $state, $stateParams, grails, config, notify) {
  
  // This boolean will be used to track the status of the context object.
  var changed = false;
  
  // Listener function for watching the context. Calling the return method will remove the current watcher.
  var watcher = null;
  var replaceWatcher = function(observe, newWatcher) {
    // Always remove any existing listeners.
    if (typeof watcher === 'function') {
      watcher();
    }
    
    if (typeof observe === 'string' && typeof newWatcher === 'function') {
      watcher = $scope.$watch(observe, newWatcher);
    } else {
      watcher = null;
    }
  };
  
  var updateContext = function (data) {
    
    $scope.context = data;
    
    // Bind a new listener to the returned object.
    replaceWatcher ('context', function() {
      
    });
    
    if (data.name) {
      $rootScope.secondaryTitle = data.name;
    }
    
    // We also create a copy for reverting.
    $scope._original = data;
  };
  
  if ($stateParams.id) {
    
    // Grab the Grails resource interaction service.
    var component = grails.r ( config.backend, 'AcademicOutput');
    
    // Change the title if we get a new one here.
    component.get($stateParams, updateContext);
    
    // Destroy listener to perform some cleanup on this scope.
    $scope.$on('$destroy', function() {
      $rootScope.secondaryTitle = null;
      $scope.context = null;
      $scope._original = null;
      
      // Remove the watcher...
      replaceWatcher();
    });
    
    
    /*** Bind some function to the scope at the end ***/
    $scope.saveChanges = function () {
      // Do some saving...
    };
    
    $scope.cancelChanges = function () {
      // Do some saving...
    };
  }
}