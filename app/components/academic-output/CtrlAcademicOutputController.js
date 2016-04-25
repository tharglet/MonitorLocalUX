'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', function($scope) {

      console.log("AcademicOutputController");

      $scope.lookupDOI = function() {
        console.log("lookupDOI");
        var callingScope = this;
        return callingScope.openModal('components/academic-output/partials/_modal_doi.html', 'DOIValidationController').result.then(function (res) {
          // Merge into the context.
          angular.merge(callingScope.context, res);
        },function (){
          // Do nothing...
        });
      };
      
      $scope.editCost = function(item) {
        console.log("Cost edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_cost_item_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
    }]);
  }
);
