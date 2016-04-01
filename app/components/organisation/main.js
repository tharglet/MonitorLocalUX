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
    return angular.module('organisation', ['grails', 'search', 'kintUi'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.organisation', {
        parent: 'app.componentSearch',
        url:   '^/organisation',
        grailsResource: 'Org',
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "org-nav@app" : {
            templateUrl: "components/organisation/partials/_nav.html",
          }
        },
        data : {
          title: "Organisation",
        }
      });
      $stateProvider.state('app.organisation.view', {
        url: '/:id',
        views: {
          "@app": {
            templateUrl: 'components/organisation/partials/view.html',
            controller: 'GrailsEditController'
          },
        },
        data : {
          subTitle: "Main"
        }
      });
    }]);
  }
);

