'use strict';

/**
 * Follow the javascript module implementation.
 */
define(
  [
   'grails',
   'kint-ui',
  ],
  function () {   // Module instantiator. Should return an object that will be stored against the name of this module.

    // Create our angular module here.
    return angular.module('profile', ['grails', 'kintUi'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.

      $stateProvider.state('app.profile', {
        url: '/profile',
        templateUrl: 'components/profile/partials/view.html',
        controller: 'ctrlProfile',
        deps:[
          'components/profile/CtrlProfile.js',
        ]
      });
    }]);
  }
);

