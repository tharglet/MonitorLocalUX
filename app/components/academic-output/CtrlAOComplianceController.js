'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOComplianceController', [ '$scope', function ($scope) {
      
      if (!$scope.context.$$compliance) {
        $scope.context.$$compliance = {};
      }
      
      // Just create the pointer for easier access in the views.
      $scope.compliance = $scope.context.$$compliance;
    }]);
  }
);