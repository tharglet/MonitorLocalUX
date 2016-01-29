'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "academic-output",     // JS module name (not the same as the angular module name.)
  [
   'globals/Finance', // File locations can also be used instead of named includes.
   'search'
  ],
  function (Finance) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('academic-output', ['ui.router', 'scs.couch-potato'])
      .config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', function($stateProvider,$urlRouterProvider,$couchPotatoProvider) {
  
    	//abstract state for academicoutput
    	$stateProvider.state('app.academicOutput', {
    		parent: 'app',
        	  requirelogin:false,
            abstract: true,
            views : {
              "top-menu" : {
            	  'templateUrl' : 'components/academic-output/partials/top-menu.html',
                controller: ['$rootScope', '$scope', '$auth', '$log', 'UserService', function ($rootScope,$scope,$auth,$log,UserService) {

                 //load the data to scope
                }],
              },
            },
          });
    	  
        // State for search. 
        $stateProvider.state('app.academicOutput.componentSearch', {
//        	WARRNING! it's not working require.js throw a problem :(
//          parent: 'app.componentSearch',
          url:          '/academic-output',
          data : {
            title: "Academic Output",
            requirelogin:false,
          },
          views: {
        	  "cointainer@app" : {
        		  templateUrl:  'components/academic-output/partials/list-view.html',
                  controller: 'AOViewCtrlList'
        	  }
          },
          resolve: {
              // This is the important bit that loads a file when this route is in action. These files are only loaded when needed.
              deps: $couchPotatoProvider.resolveDependencies([
                'academic-output/ao-controller-view',
                'academic-output/ao-factory-utils'
              ])
            },
        });
                        
        // Default config for un-named view.
        $stateProvider.state('app.academicOutput.view', {
        	parent: 'app.academicOutput',
            url:          '^/academic-output/:id',
            resolve: {
                // This is the important bit that loads a file when this route is in action. These files are only loaded when needed.
                deps: $couchPotatoProvider.resolveDependencies([
                  'academic-output/ao-controller-view',
                  'academic-output/ao-factory-utils'
                ])
              },
              views: {
            	  "cointainer@app" : {
            		  templateUrl:  'components/academic-output/partials/details-view.html',
            		  controller: 'AOViewCtrl'
            	  }
              },
            data : {
              title: "Academic Output Details",
              requirelogin:false,
            },            
          });        
      }]);
  }
);