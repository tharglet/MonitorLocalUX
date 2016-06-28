'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('ctrlProfile', [ '$scope', function($scope) {

      console.log("ProfileController");
      console.log("User:%o",$scope.application.user);

      $scope.requestAffiliation = function() {
        console.log("requestAffiliation");
      }

    }]);
  }
);
