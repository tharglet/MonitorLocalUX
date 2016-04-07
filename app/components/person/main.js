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
    return angular.module('person', ['grails', 'search', 'kintUi'])
      .config(['$stateProvider', function($stateProvider) {
        // State for search.
        $stateProvider.state('app.person', {
          parent: 'app.componentSearch',
          url:   '^/person',
          grailsResource: 'Person',
          views: {
            // Unnamed view.
            "" : {
              controller: 'SearchResultsController',
            },
            "person-nav@app" : {
              templateUrl: "components/person/partials/_nav.html",
            }
          },
          data : {
            title: "Person",
          }
        });
        $stateProvider.state('app.person.view', {
          url: '/:id',
          views: {
            "@app": {
              templateUrl: 'components/person/partials/view.html',
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

