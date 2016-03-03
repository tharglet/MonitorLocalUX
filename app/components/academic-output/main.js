'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "academic-output",     // JS module name (not the same as the angular module name.)
  [
   'angular-ui-router',
   'search'
  ],
  function (Finance) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('academic-output', ['ui.router', 'search'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.academicOutput', {
        parent: 'app.componentSearch',
        url:   '^/academic-output',
        data : {
          title: "Academic Output",
        },
      });

      // Default config for un-named view.
      $stateProvider.state('app.academicOutput.view', {
        url:          '/:id',
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/main.html',
          }
        },
        data : {
          title: "Academic Output Details",
        },
      });
    }]);
  }
);

