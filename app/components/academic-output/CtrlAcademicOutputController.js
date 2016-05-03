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

      $scope.editFunder = function(item) {
        console.log("Funder edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_funder_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };

      $scope.editLicenceEvidence = function(item) {
        console.log("Licence Evidence edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_licence_evidence_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };

      $scope.editEmbargoEvidence = function(item) {
        console.log("Embargo Evidence edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_embargo_evidence_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };

      $scope.editAcknowledgementEvidence = function(item) {
        console.log("Acknowledgement Evidence edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_acknowledgement_evidence_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };

      $scope.editResearchEvidence = function(item) {
        console.log("Research Evidence edit");
        var callingScope = this;
        callingScope.openModal('components/academic-output/partials/_modal_research_evidence_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
    }]);
  }
);
