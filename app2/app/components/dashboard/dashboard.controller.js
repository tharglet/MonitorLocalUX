'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
  // Create our angular module here.
angular.module('uiMonitorLocal.dashboard.controllers', ['ui.router'])

  .controller('DashboardCtrl', function ($scope, $state) {
    console.log('execute dashboard controller');
    $state.current.subTitle = 'Subtitle';
    $state.current.title = 'Dashboard';
  });
