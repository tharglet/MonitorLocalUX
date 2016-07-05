'use strict';

define (
  function () {
    return function (theme) {
      var template = 'components/kint-ui/directives/widgets/' + theme + '/notes.html';
      
      return {
        restrict: 'A',
        scope: {
          blank: '&',
          add: '&',
          edit: '&',
          save: '&',
          remove: '&',
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
          
          $scope.notes = $scope.object[$scope.property];
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
          
          // Add the helper methods.
          $scope.saveNote = function(item) {
            $scope.save({note: item});
          };
          $scope.editNote = function(item) {
            $scope.edit({note: item});
          };
          $scope.cancelNote = function(item) {
            $scope.cancel({note: item});
          };
          $scope.addNote = function() {
            $scope.add({notes : listName, note: angular.copy($scope.$newNote)});
            angular.copy($scope.$blankNote, $scope.$newNote);
          };
          $scope.removeNote = function(item) {
            $scope.remove({notes : listName, note: item});
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
          
          // Get the ID, name and classes defined on the element to move to the text area.
          var id = $scope.id;
          var name = $scope.name;
          
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