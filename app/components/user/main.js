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
    return angular.module('user', ['grails', 'search', 'kintUi'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.user', {
        parent: 'app.componentSearch',
        url:   '^/user',
        grailsResource: 'User',
        searchFields: [
          {
            'data'  : 'type.value',
            'title' : "Type"
          }
        ],
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "org-nav@app" : {
            templateUrl: "components/user/partials/_nav.html",
          }
        },
        data : {
          title: "User",
        }
      });
      $stateProvider.state('app.user.view', {
        url: '/:id',
        views: {
          "@app": {
            templateUrl: 'components/user/partials/view.html',
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

