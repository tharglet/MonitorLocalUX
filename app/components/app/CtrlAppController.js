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

    // Open a modal.
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

    // Edit List items.
    $scope.editListItem = function (template, item) {
      // Calling scope.
      var callingScope = this;
      
      if (typeof item === 'string') {
        
        var multiProp = arguments[2];
        var formName = arguments[3];
        
        // Blank alter.
        var blankAlter = arguments[4];
        
        callingScope.modalEditListItem(template, item, multiProp, function (obj) {
          
          // Add to the list.
          callingScope.context[item].push( obj );
          
          // Dirty the owning form too!
          callingScope[formName].$setDirty();
        }, null, blankAlter);
      } else {
        
        var formName = arguments[2];
        callingScope.editMultiProperty(item);
        callingScope.modalEditListItem(template, item, function (item) {
          
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope[formName].$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      }
    };
    
    // Modal editing of list items.
    $scope.modalEditListItem = function (modalTmp, item) {
      
      // Grab the current scope (from which this method was actually called and not where declared).
      var callingScope = this;
      
      if (typeof item === 'string' && typeof arguments[2] === 'string') {
        
        // The scoped name of the variable we are going to edit in the modal.
        var scopedVarName = arguments[2];
        
        // Callbacks at args 3,4
        var cbConfirm = arguments[3];
        var cbCancel = arguments[4];
        
        // Blank alter.
        var blankAlter = arguments[5];
        
        // String indicates list item property on the context. We need to create one.
        callingScope.getBlank(item).then(function ( item ) {
          
          // First thing is to alter the blank if the callee has supplied
          // a method to do so. The return value of the method should be the
          // altered object.
          if (typeof blankAlter === 'function') {
            // Call the method supplying the blank (execute in the calling scope).
            item = blankAlter.call (callingScope, item);
          }
          
          var modalScope = callingScope.$new();
          
          // Add the blank.
          modalScope[scopedVarName] = item;
          
          // We should now open the modal.
          modalScope.openModal(modalTmp).result.then(cbConfirm, cbCancel);
        });
      } else {

        // Callbacks at args 2,3
        var cbConfirm = arguments[2];
        var cbCancel = arguments[3];
        
        // Assume editing ob existing object.
        callingScope.openModal(modalTmp).result.then(cbConfirm, cbCancel);
      }
    }
  }]);
});