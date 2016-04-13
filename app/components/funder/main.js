'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  [
    'grails',
    'search',
    'kint-ui',
  ],
  function () {   // Module instantiator. Should return an object that will be stored against the name of this module.

    // Create our angular module here.
    return angular.module('funder', ['grails', 'search', 'kintUi'])
      .config(['$stateProvider', function($stateProvider) {
        // State for search.
        $stateProvider.state('app.funder', {
          parent: 'app.componentSearch',
          url:   '^/funder',
          grailsResource: 'Funder',
          views: {
            // Unnamed view.
            "" : {
              controller: 'SearchResultsController',
            },
            "funder-nav@app" : {
              templateUrl: "components/funder/partials/_nav.html",
            }
          },
          data : {
            title: "Funder",
          }
        });
        $stateProvider.state('app.funder.view', {
          url: '/:id',
          views: {
            "@app": {
              templateUrl: 'components/funder/partials/view.html',
              controller: 'GrailsEditController'
            },
          },
          data : {
            subTitle: "General"
          }
        });
      }]);
  }
);

