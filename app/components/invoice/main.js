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
    return angular.module('invoice', ['grails', 'search', 'kintUi'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.invoice', {
        parent: 'app.componentSearch',
        url:   '^/invoice',
        grailsResource: 'Invoice',
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "invoice-nav@app" : {
            templateUrl: "components/invoice/partials/_nav.html",
          }
        },
        data : {
          title: "Invoice",
        }
      });
      $stateProvider.state('app.invoice.view', {
        url: '/:id',
        views: {
          "@app": {
            templateUrl: 'components/invoice/partials/view.html',
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

