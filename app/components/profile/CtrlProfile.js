'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('ctrlProfile', [ '$scope', 'grailsResource', function($scope, grailsResource) {
      
      $scope.context = grailsResource.staticInst();

      console.log("ProfileController");
      console.log("User:%o",$scope.application.user);

      $scope.requestAffiliation = function() {
        console.log("requestAffiliation");
      }

      $scope.affiliationRequestData = {
      }

    }]);
  }
);
