'use strict';

define (
  function () {
    return function (theme) {
      var template = 'components/kint-ui/directives/widgets/' + theme + '/notes.html';
      
      return {
        restrict: 'A',
        scope: {
          blank: '&',
          object: '=',
          property: '@',
          type: '@',
          id: '@',
          name: '@',
          elClasses: '@class',
          user: '<'
        },
        link: function($scope, $element) {
          var listName = $scope.property;
          
          if (typeof $scope.type === 'undefined') {
            // Blank string.
            $scope.type = "";
          }
          
          // Get the ID and name.
          var id = $scope.id;
          var name = $scope.name;
          
          $scope.$blankNote = {};
          $scope.$newNote = {};
          
          // Fetch a blank note and bind it.
          $scope.blank({notes: listName}).then(function(blank) {
            angular.merge($scope.$blankNote, blank, {
              typeString: $scope.type,
              createdBy: $scope.user
            });
            angular.copy($scope.$blankNote, $scope.$newNote);
          });
          
          var dirtyForm = function() {
            $scope[(id || name) + 'Form'].$setDirty(true);
          }
          
          // Add the helper methods.
          $scope.saveNote = function(item) {
            // No need to roll back.
            delete item.$$original;
            item['$editMode'] = false;
            dirtyForm();
          };
          
          $scope.editNote = function(item) {
            // Get the current value.
            var _orig = {};
            
            // Copy to our object.
            angular.copy(item, _orig);
            
            // Now that we have a copy we can save the copy. Important to copy first so we don't try to copy the copy.
            item.$$original = _orig;
            
            item['$editMode'] = true;
            dirtyForm();
          };
          
          $scope.cancelNote = function(item) {
            
            // Grab the original.
            var _orig = item.$$original;
            
            // We should now remove it from the element.
            delete item.$$original;
            
            // Restore the original.
            angular.copy(_orig, item);
            item['$editMode'] = false;
            dirtyForm();
          };
          
          $scope.addNote = function() {
            
            // Create a new item.
            var item = angular.merge (angular.copy($scope.$newNote), {created: new Date().toISOString()});
            $scope.object[$scope.property].push( item );
            
            // Reset the new note to be the blank.
            angular.copy($scope.$blankNote, $scope.$newNote);
            dirtyForm();
          };
          
          $scope.removeNote = function(item) {
            
            // Remove the item.
            var index = $scope.object[$scope.property].indexOf(item);
            $scope.object[$scope.property].splice(index, 1);
            dirtyForm();
          };
          
          // Filter comparator function.
          $scope.filterMatcher = function(actual, expected) {
            if (typeof expected === 'undefined' || expected === '' ) {
              return true;
            }
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
          };
          
          // Add the class to this element.
          var el = angular.element($element);
          
          // Clear any classes on here and add a single notes class.
          el.addClass('notes');
          
          // Change the ID to have a container appendage so it won't clash with the textarea..
          if (id) {
            el.attr('id', id + '-container');
          }
          if (name || id ) {
            el.attr('name', (name || id) + '-container');
          }
        },
        templateUrl: template,
      };
    };
  }
);