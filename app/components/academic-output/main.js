'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "academic-output",     // JS module name (not the same as the angular module name.)
  ['globals/Finance'],   // File locations can also be used instead of named includes.
  function (finance) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('academic-output', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  
        console.log("Config academic-output");
        
        // Default config for un-named view. 
        $stateProvider.state('academic-output', {
          url:          '/academic-output',
          templateUrl:  'components/academic-output/partials/main.html',
          data: {
            title: "Academic Output"
          },
          controller: ['$scope', function ($scope, Finance) {
            $scope['academicOutput'] = {
              name  : "My test academic output",
              value : 100,
              tax : function () {
                return finance.calcTax(this.value);
              }
            };
          }]
        });
      }])
      // .controller('Search', ["$scope", function($scope) {
      // }])
    ;
  }
);
