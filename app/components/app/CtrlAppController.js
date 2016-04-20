'use strict';

define (
['app','auth/SvcUserService'],
function(app) {
  return  app.registerController ('AppController', ['$rootScope', '$scope', '$state', '$uibModal', function ($rootScope, $scope, $stateProvider, $modal) {

    /**
     * Method to set the title.
     */
    function setTitle () {
      
      if ($stateProvider.$current.data && $stateProvider.$current.data.title) {
        $rootScope.title = $rootScope.$state.current.data.title;
      } else {
        $rootScope.title = null;
      }
      if ($stateProvider.$current.data && $stateProvider.$current.data.hasOwnProperty("subTitle")) {
        $rootScope.subTitle = $rootScope.$state.current.data.subTitle;
      } else {
        $rootScope.subTitle = null;
      }
      if ($stateProvider.$current.data && $stateProvider.$current.data.hasOwnProperty("secondaryTitle")) {
        $rootScope.secondaryTitle = $rootScope.$state.current.data.secondaryTitle;
      }
    };
    
    /**
     * Method to change the trail.
     */
    function setTrail() {
      
      // Grab the current state object in full.
      var current_state = $stateProvider.$current;
      
      // Set some body classes too.
      $scope.bodyClasses = current_state.name.replace(/[\.\-]/ig, ' ').trim();
      
      // Clean the crumb first
      $scope.crumb_trail = [];
      if (current_state.self.url != "/") {
        
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
    
    setTrail();
    setTitle();
    $rootScope.$on('$stateChangeSuccess', function() {
      setTitle();
      setTrail();
    });
    

    // open a modal.
    $scope.openModal = function (template, ctrl) {
      var $mScope = this;
      var conf = {
        animation: true,
        templateUrl: template,
        scope: $mScope
      };
      
      if (typeof ctrl !== 'undefined') {
        conf.controller = ctrl;
      }
      
      return $modal.open(conf);
    };
  }]);
});