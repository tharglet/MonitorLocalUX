'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOPeopleController', [ '$scope', '$filter', function($scope, $filter) {
      
      // Update people...
      var updatePeople = function() {
        $scope.people = $filter('orderBy') ( $filter('filter') ($scope.context.names, { person : { id : '' } }), '-keyContact') ;
      }
      
      updatePeople();
      
      // Watch for the changes 
      $scope.$watchCollection ('context.names', updatePeople);
      
      $scope.data={
      };
      
      $scope.blankPerson = {};
      $scope.getBlank('names').then(function(data){
        angular.copy(data, $scope.blankPerson); 
      });
      
      $scope.addAOPerson = function (person, role) {
        var item = angular.merge(angular.copy($scope.blankPerson), {
          'person'        : person,
          'name'          : person.name,
          'namerel'     : role,
          'keyContact' : this.context.names.length < 1 
        });
        this.context.names.push (item);
        this.academicOutput.$setDirty();
      };
      
      $scope.makeKeyContact = function(item) {
        angular.forEach ( this.context.names, function(contact) {
          if (!angular.equals (item, contact)) {
            // Set as primary contact.
            contact.keyContact = false;
          }
          
          // Now set the item flag.
          item.keyContact = true;
        });
        this.academicOutput.$setDirty();
      };
      
      $scope.removeContact = function(item) {
        this.removeFrom('names', item);
        this.academicOutput.$setDirty();
      };
    }]);
  }
);
