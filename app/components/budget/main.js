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
    return angular.module('budget', ['grails', 'search', 'kintUi'])
      .config(['$stateProvider', function($stateProvider) {
        // State for search.
        $stateProvider.state('app.budget', {
          parent: 'app.componentSearch',
          url:   '^/budget',
          grailsResource: 'Budget',
          views: {
            // Unnamed view.
            "" : {
              controller: 'SearchResultsController',
            },
            "budget-nav@app" : {
              templateUrl: "components/budget/partials/_nav.html",
            }
          },
          data : {
            title: "Budget",
          }
        });
        $stateProvider.state('app.budget.view', {
          url: '/:id',
          views: {
            "@app": {
              templateUrl: 'components/budget/partials/view.html',
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

