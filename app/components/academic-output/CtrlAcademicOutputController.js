'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', function($scope) {

      console.log("AcademicOutputController");

      $scope.lookupDOI = function() {
        console.log("lookupDOI");
        return $scope.openModal('components/academic-output/partials/_doi.html', 'DOIValidationController');
      };
      
      $scope.editCost = function() {
        console.log("Cost edit");
        return $scope.openModal('components/academic-output/partials/_table_cost_item_row_edit.html');
      };
    }]);
  }
);
