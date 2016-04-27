'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOPeopleController', [ '$scope', '$filter', function($scope, $filter) {

      console.log("AOPeople Controller");
      
      $scope.people = $filter('filter') ($scope.context.names, { person : { id : '' } });
      
      $scope.$watchCollection ('context.names', function(){
        $scope.people = $filter('filter') ($scope.context.names, { person : { id : '' } });
      });
      
      $scope.data={
          person:null,
          orgFilter: null
      };
      $scope.addAOPerson = function (person, role) {
        this.context.names.push ({
          'person': person,
          'name': person.name,
          'namerel': role
        });
      };
    }]);
  }
);
