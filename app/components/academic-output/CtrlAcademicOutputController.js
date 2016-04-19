'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AcademicOutputController', [ '$scope', function($scope) {

      console.log("AcademicOutputController");

      $scope.lookupDOI = function() {
        console.log("lookupDOI");
      };

      /**
       * Code for search box will go here.
       */
    }]);
  }
);
