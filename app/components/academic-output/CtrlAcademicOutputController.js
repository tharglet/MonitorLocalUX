'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', '$uibModal', function($scope, $modal) {

      console.log("AcademicOutputController");

      $scope.lookupDOI = function() {
        console.log("lookupDOI");
          var modalInstance = $modal.open({
          // animation: $scope.animationsEnabled,
          templateUrl: 'components/academic-output/partials/_doi.html',
          controller: 'DOIValidationController',
          // size: size ,
        });

      };

    }]);
  }
);
