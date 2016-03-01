'use strict';
define(
  ['app'],
  function(app){
    return  app.registerController ('BreadcrumbController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $stateProvider) {
      
      /**
       * Method to change the trail.
       */
      function setTrail() {
        // Grab the current state object in full.
        var current_state = $stateProvider.$current;
        
        // Active state trail is available under the path variable.
        var crumb_titles = [];
        if (current_state.path) {
          for (var i=0; i<current_state.path.length; i++) {
            var state = current_state.path[i];
            if (state.self.data && state.self.data.hasOwnProperty("title")) {
              var crumb = {
                'title': state.data.title,
              };
              
              // We also need a path for the piece.
              var path = $stateProvider.href(state.self.name, null, {inherit: true, lossy:true});
              if (path) {
                crumb.uri = path;
              }
              
              // Instead of using push set the indices manually to avoid duplicate keys when angular attempts,
              // to iterate over it.
              crumb_titles[crumb_titles.length] = crumb;
            }
          }
        }
        
        if (crumb_titles.length > 1) {
        
          delete crumb_titles[crumb_titles.length-1].uri;
          
          // Now we have the data we need we should add the links to the scope.
          $scope.crumb_trail = crumb_titles;
          console.log(crumb_titles);
        }
      }
      

      // Lets set initially.
      setTrail();
      
      // Also listen gfor changes.
      $rootScope.$on('$stateChangeSuccess', function() {
        setTrail();
      });
      
    }]);
  }
);
