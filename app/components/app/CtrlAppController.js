'use strict';

define (
['app','auth/SvcUserService'],
function(app) {
  return  app.registerController ('AppController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $stateProvider) {
    

    /**
     * Method to set the title.
     */
    function setTitle () {
      if ($stateProvider.$current.data && $stateProvider.$current.data.title) {
        $rootScope.title = $rootScope.$state.current.data.title;
      }
      if ($stateProvider.$current.data && $stateProvider.$current.data.hasOwnProperty("subTitle")) {
        $rootScope.subTitle = $rootScope.$state.current.data.subTitle;
      }
    };
    
    /**
     * Method to change the trail.
     */
    function setTrail() {
      
      // Clean the crumb first
      $scope.crumb_trail = [];
      if ($stateProvider.$current.self.url != "/") {
      
        // Grab the current state object in full.
        var current_state = $stateProvider.$current;
        
        // Active state trail is available under the path variable.
        var crumb_titles = [{
          title: "Home",
          uri: "/"
        }];
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
    }
    
    if ($stateProvider.$current) {
      // Add the states ass root classes.
      $rootScope.bodyClasses = $rootScope.$state.current.name.replace(/[\.\-]/ig, ' ').trim();
    }
    
    setTrail();
    setTitle();
    $rootScope.$on('$stateChangeSuccess', function() {
      setTitle();
      setTrail();
    });
  }]);
});