'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('ctrlProfile', [ '$scope', function($scope) {

      console.log("ProfileController");

    }]);
  }
);
