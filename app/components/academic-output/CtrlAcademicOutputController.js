'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', '$modal', function($scope, $modal) {

      console.log("AcademicOutputController");

      $scope.lookupDOI = function() {
        console.log("lookupDOI");
          var modalInstance = $modal.open({
          // animation: $scope.animationsEnabled,
          templateUrl: 'academic_output/partials/_doi.html',
          // controller: 'DOILookupCtrl',
          // size: size ,
        });

      };

      /**
       * Code for search box will go here.
       */
    }]);
  }
);
