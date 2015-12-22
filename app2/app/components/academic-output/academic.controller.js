'use strict';
/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
  // Create our angular module here.
angular.module('uiMonitorLocal.academic.controllers', ['ui.router'])
  .controller('academicCtrl', function ($scope, $state) {
    console.log('execute academic controller');
  })
  .controller('academicListCtrl', function ($scope, $state, academic, utils) {
    console.log(academic);
    console.log('execute academic list');
    $scope.academic = academic;
  })
  .controller('uiMonitorLocalEditCtrl', function ($scope, $state, utils, $stateParams) {
    console.log('execute academic edit')
    $scope.item = utils.findById($scope.academicData.items, $stateParams.itemId);

    $scope.done = function () {
      // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
      $state.go('^', $stateParams);
    }
  })
  .controller('uiMonitorLocalDetailCtrl', function ($scope, utils, $state, $stateParams) {
    console.log('execute academic detail');
    $scope.item = utils.findById($scope.academicData.items, $stateParams.itemId);

    $scope.edit = function () {
      // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
      // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
      // Here we are going down to the child state 'edit' (full name of 'academic.detail.item.edit')
      $state.go('.edit', $stateParams);
    };
  })
  .controller('uiMonitorLocalDetailItemCtrl', function ($scope, utils, $state, $stateParams) {
      console.log('execute academic detail item');
      $scope.academicData = utils.findById($scope.academic, $stateParams.academicId);
  })
