'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "academic-output",     // JS module name (not the same as the angular module name.)
  ['globals/Finance', 'search'],   // File locations can also be used instead of named includes.
  function (Finance) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('academic-output', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  
        // State for search.
        $stateProvider.state('app.componentSearch.academicOutput', {
          url:          '/academic-output',
          data : {
            title: "Academic Output",
            requirelogin:false,
          },
          controller: ['$scope', '$state', 'AOStorage', function ($scope, $state, AOStorage) {
        	 $scope.academic = AOStorage;
        	 console.log('here loading AOStorage');
             $scope['academicOutputList'] = AOStorage.getStorage().AOList;
                
          }]
        });
        
        $stateProvider.state('app.academicOutput-list', {
        	parent : 'app',
            url:          '/academic-output-list',
            templateUrl:  'components/academic-output/partials/list-view.html',
            data : {
              title: "Academic Output List",
              requirelogin:false,
            },
            controller: ['$scope', '$state', 'AOStorage', function ($scope, $state, AOStorage) {
              
           	$scope['academicOutputList'] = AOStorage.getStorage().AOList;
              
              }]
          });
                
        // Default config for un-named view.
        $stateProvider.state('app.academicOutput-view', {
        	parent : 'app',
            url:          '^/academic-output/:id',
            templateUrl:  'components/academic-output/partials/details-view.html',
            data : {
              title: "Academic Output Details",
              requirelogin:false,
            },
            controller: ['$scope', '$state', 'AOStorage', 'utils', function ($scope, $state, AOStorage, utils) {
                          	
           	console.log($scope['academicOutput']);
           	
           	console.log('loging the id ');
           	console.log($state.params['id']);
           	
           	//This is a very very bad practice of coding! I have to put this into scope in some parent method
           	// but Im blocked by search state to create another abstract state
           	AOStorage.async().then(function(d) {
           		$scope['academicOutput'] = utils.findById(d, $state.params['id']);
                console.log($scope.data);
              });
           	
           	$scope.showData = function(){
           		console.log($scope['academicOutput']);
           	}
           	
              $scope.addRow = function(){
            	  AOStorage.addAward();
              };
              
              }]
          });
        
      }])
      
      .directive('awardRecord', ['AOStorage',function(AOStorage) {
    	  return {
    		    restrict: 'E',
    		    scope:{
    		    	globalitem : '=item',
    		    	key : '=key'
    		    },
    		    templateUrl: 'components/academic-output/partials/award-record-directive.html',
    		    link: function(scope, element, attrs){
    		    		element.find('.remove').bind('click', function(){
    		    			AOStorage.deleteAward(scope.key);
    		    		});    		    		
    	            }
    		  }
    		}])
    /**
     * Temp factory provides us some utils
     * 
     * 
     */
  .factory('utils', function () {
    return {
      // Util for finding an object by its 'id' property among an array
      findById: function findById(a, id) {
    	  console.log('finding in:');
    	  console.log(a);
    	  console.log(id);
        for (var i = 0; i < a.length; i++) {
        	console.log(a[i]);
        	console.log(id);
          if (a[i].ao_id == id) return a[i];
        }
        console.log('null!');
        return null;
      },
    };
  })
    		
    .factory('AOStorage', ['$http', 'utils', function ($http, utils) {
    var path = '../mockups/ao_item.json';
    var academic;
    
    var factory = {
    	async: function(){
    		//we load data only once 
    		if(!academic){
    		    var academic = $http.get(path).then(function (response) {
    	    		console.log('here is your data :)');
    	    		console.log(response.data.list)
    	    		return response.data.list;
    	      }, function (response) {
    	        console.log('something goes wrong!');
    	        console.log(response);
    	      });
    		}
    		return academic;
    	}
    };
    return factory;
    
    var factory = {};
    
    /**
     * Deleting an academic output item
     * 
     * TODO finish and test
     * 
     * var key - academic output ID
     */
    factory.delete = function(key){
    	delete(storage.AOData['awards'][key]);
    }
    
    /**
     * Add a Academic output 
     * 
     * TODO 
     * FINISH AND USE
     * 
     */
    factory.add = function(){
    	storage.AOData['awards'][Date.now()] = '';
    	console.log(storage.AOData['awards']);
    }
    
    /**
     * 
     * Get academic output by id
     * 
     * var id - Academic output id
     */
    factory.get = function(id){
	 return academic.then(function(){
		 console.log('inside the promise');
		 console.log(academic);
		 console.log(utils.findById(academic, id));
		 return utils.findById(academic, id);
	 },function (response) {
	        console.log('something goes wrong!');
	        console.log(response);
	      })
    }
      
    /**
     * Get all list of academic output
     * 
     * TODO write the body and use
     */
    factory.getList = function(){
    	return academic.then(function(){
    		 utils.findById(academic, id);
    	})
    }
    
    return factory;
    }]);
      // .controller('Search', ["$scope", function($scope) {
      // }])
    ;
    
    
    
  }
);
