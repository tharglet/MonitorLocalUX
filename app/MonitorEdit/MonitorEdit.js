'use strict';

angular.module('monitorLocalUxApp.Edit', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    }])
    .controller('EditController', ["$scope", '$stateParams', function($scope,$stateParams) {

      console.log("Edit Controller :: stateParams: %o",$stateParams);

      $scope.objectForm=$stateParams.editTemplate;

    }])
;

