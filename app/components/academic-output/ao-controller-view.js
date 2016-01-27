'use strict';

console.log ("Loading AO View Controller file!");
define(
  [
   'app',                 // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
   './ao-factory-storage' // We also need the aofactory javascript module as that contains the AOStorage angular factory. The "." in the include signifies relative path!
  ],
  function (app) {
    console.log ("Initialising AO View Controller");
    app.registerController("AOViewCtrl", ['$scope', '$state', 'AOStorage', 'utils', function ($scope, $state, AOStorage, utils) {
             	
       	//This is a very very bad practice of coding! I have to put this into scope in some parent method
       	// but Im blocked by search state to create another abstract state
       	AOStorage.async().then(function(d) {
       		$scope['academicOutput'] = utils.findById(d, $state.params['id']);
          });
       	
       	$scope.showData = function(){
       		console.log($scope['academicOutput']);
       	}
       	
          $scope.addRow = function(){
        	  AOStorage.addAward();
          };
      
    }]);
  }
);