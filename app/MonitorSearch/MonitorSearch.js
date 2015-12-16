'use strict';

angular.module('monitorLocalUxApp.Search', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    }])
    .controller('SearchController', ["$scope", function($scope) {

      $scope.cols=[
        {colName:'col1'},
        {colName:'col2'},
        {colName:'col3'}
      ];

    }])
;

