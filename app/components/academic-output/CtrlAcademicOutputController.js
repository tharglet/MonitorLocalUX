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
        
        // Need to remember the original.
        callingScope.editMultiProperty(item);
        
        callingScope.openModal('components/academic-output/partials/_modal_cost_item_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope.academicOutput.$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };

      $scope.editFunder = function(item) {
        console.log("Funder edit");
        var callingScope = this;
        
        // Need to remember the original.
        callingScope.editMultiProperty(item);
        
        callingScope.openModal('components/academic-output/partials/_modal_funder_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope.academicOutput.$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };

      $scope.editEvidence = function(item) {
        console.log("Licence Evidence edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_evidence_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope.academicOutput.$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
      

      $scope.editDeposit = function(item) {
        console.log("Deposite Edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_deposit_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope.academicOutput.$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
    }]);
  }
);
