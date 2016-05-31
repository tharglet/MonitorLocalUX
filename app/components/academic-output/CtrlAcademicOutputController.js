'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', function($scope) {

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

      $scope.editFunder = function(item) {
        if (typeof item === 'string') {
          this.editListItem ('components/academic-output/partials/_modal_funder_edit.html', item, arguments[1], 'academicOutput');
        } else {
          this.editListItem ('components/academic-output/partials/_modal_funder_edit.html', item, 'academicOutput');
        }
      };
      
      $scope.editEvidence = function(item) {
        if (typeof item === 'string') {
          this.editListItem ('components/academic-output/partials/_modal_evidence_edit.html', item, arguments[1], 'academicOutput');
        } else {
          this.editListItem ('components/academic-output/partials/_modal_evidence_edit.html', item, 'academicOutput');
        }
      };

      $scope.editDeposit = function(item) {
        if (typeof item === 'string') {
          this.editListItem ('components/academic-output/partials/_modal_deposit_edit.html', item, arguments[1], 'academicOutput');
        } else {
          this.editListItem ('components/academic-output/partials/_modal_deposit_edit.html', item, 'academicOutput');
        }
      };
    }]);
  }
);
