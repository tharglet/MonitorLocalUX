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
          }
        });
        
        $stateProvider.state('app.academicOutput-details', {
        	parent : 'app',
            url:          '/academic-output-details',
            templateUrl:  'components/academic-output/partials/details-view.html',
            data : {
              title: "Academic Output Details",
              requirelogin:false,
            },
            controller: ['$scope', '$state', 'AOStorage', function ($scope, $state, AOStorage) {
              
           	$scope['academicOutput'] = AOStorage.getStorage().AOData;
            	
              $scope.addRow = function(){
            	  AOStorage.addAward();
              };
              
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
            url:          '^/academic-output/:id',
            templateUrl:  'components/academic-output/partials/main.html',
            data : {
              title: "Academic Output",
              requirelogin:false,
            },
            controller: ['$scope', '$state', function ($scope, $state) {
              
              $scope['academicOutput'] = {
                id    : $state.params['id'],
                name  : "My test academic output",
                value : 100,
                tax : function () {
                  return Finance.calcTax(this.value);
                }
              };
              
              $state.current.data.subTitle = $scope['academicOutput']['name'] + ": " + $state.params['id'];
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
    .factory('AOStorage', function() {
    var storage = {
      AOData : {
      	ref : '9584',
    	title : 'Diagnosis and management of primary cliairy dyskinetia',
    	status: 'Accepted',
    	reason: '',
    	route : 'Gold',
    	awards : {NEGO16003457 : 'NE/GO16003/457', NEGO89803090 :'NE/GO89803/090'},
    	administrator: 'Latimer Hazar'
      },
	    AOList : {0:{
	    	ID : '1234',
	    	title : 'Some Academic article',
	    	authors : {0:'Mateusz Kasiuba'},
	    	publication : 'Non exist Journal',
	    	publisher : 'famous publisher',
	    	cost : '9999',
	    	status : 'Unpublished',
	    	payment : 'Unpaid'
	    },1:{
	    	ID : '9999',
	    	title : 'Special Article',
	    	authors : {0:'Famous Author'},
	    	publication : 'Non exist Journal',
	    	publisher : 'small publisher',
	    	cost : '123',
	    	status : 'Published',
	    	payment : 'Unpaid'
	    }}
    };
    
    var deleteAward = function(key){
    	delete(storage.AOData['awards'][key]);
    }
    
    var addAward = function(){
    	storage.AOData['awards'][Date.now()] = '';
    	console.log(storage.AOData['awards']);
    }
    
    var getStorage = function(){
    	return storage;
    }
    
    return {
        deleteAward: deleteAward,
        addAward: addAward,
        getStorage: getStorage
      };
    });
    		
    
    		;
      // .controller('Search', ["$scope", function($scope) {
      // }])
    ;
    
    
    
  }
);
