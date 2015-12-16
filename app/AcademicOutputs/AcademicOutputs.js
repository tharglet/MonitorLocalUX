
'use strict';

angular.module('monitorLocalUxApp.AcademicOutputs', ['ui.router', 'monitorLocalUxApp.Search'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

        $stateProvider.state('AcademicOutputsSearch', {
          url: '/academicOutputs',
          templateUrl: 'MonitorSearch/search.html',
          controller: 'SearchController',
          searchContext: 'AOSearch'
        });

        $stateProvider.state('AcademicOutputsEdit', {
          url: '/academicOutputs/edit/:id',
          templateUrl: 'edit/edit.html',
          controller: 'EditController',
          data:{
            editTemplate:'/academicOutputs/academicOutput.html'
          }
        });

    }])
    // .controller('Search', ["$scope", function($scope) {
    // }])
;

