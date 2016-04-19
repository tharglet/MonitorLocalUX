'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('DOIValidationController', [ '$scope', function($scope) {

      console.log("DOIValidationController");

      $scope.validate = function(){
        console.log("validate");
      };

    }]);
  }
);
