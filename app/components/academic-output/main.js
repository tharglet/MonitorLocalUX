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
            resolve: {
              // This is the important bit that loads a file when this route is in action. These files are only loaded when needed.
              deps: $couchPotatoProvider.resolveDependencies([
                'academic-output/ao-directive-award',
                'academic-output/ao-controller-view'
              ])
            },
            controller: 'AOViewCtrl'
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
    ;
  }
);
