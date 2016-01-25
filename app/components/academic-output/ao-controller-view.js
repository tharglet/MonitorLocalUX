'use strict';

console.log ("Loading AO View Controller file!");
define(
  [
   'app',                 // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
   './ao-factory-storage' // We also need the aofactory javascript module as that contains the AOStorage angular factory. The "." in the include signifies relative path!
  ],
  function (app) {
    console.log ("Initialising AO View Controller");
    app.registerController("AOViewCtrl", ['$scope', '$state', 'AOStorage', function ($scope, $state, AOStorage) {
      
      $scope['academicOutput'] = AOStorage.getStorage().AOData;
      
      $scope.addRow = function(){
        AOStorage.addAward();
      };
      
    }]);
  }
);