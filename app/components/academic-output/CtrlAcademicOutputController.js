'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', function($scope) {

      console.log("AcademicOutputController");

      $scope.lookupDOI = function() {
        console.log("lookupDOI");
        return $scope.openModal('components/academic-output/partials/_modal_doi.html', 'DOIValidationController');
      };
      
      $scope.editCost = function(item) {
        console.log("Cost edit");
        return $scope.openModal('components/academic-output/partials/_modal_cost_item_edit.html');
      };
    }]);
  }
);
