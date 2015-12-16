'use strict';

angular.module('monitorLocalUxApp.AcademicOutputs', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

      console.log("Config monitorLocalUxApp.AcademicOutputs");

        $stateProvider.state('AcademicOutputsSearch', {
          url: '/academicOutputs',
          templateUrl: 'AcademicOutputs/search.html',
        });

    }])
    // .controller('Search', ["$scope", function($scope) {
    // }])
;

