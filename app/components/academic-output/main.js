'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "academic-output",     // JS module name (not the same as the angular module name.)
  [
   'pnotify',
   'angular-ui-router',
   'search',
   'grails',
   'angular-ui-sortable',
   'angular-sanitize',
   'ui-select'
  ],
  function (notifications) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('academic-output', ['ui.router', 'ui.sortable', 'ui.select', 'ngSanitize', 'search'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.academicOutput', {
        parent: 'app.componentSearch',
        url:   '^/academic-output',
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "nav@app" : {
            templateUrl: "components/academic-output/partials/_nav.html",
          }
        },
        data : {
          title: "Academic Output",
        },
      });

      // Default config for un-named view.
      $stateProvider.state('app.academicOutput.view', {
        url: '/:id',
        views: {
          "@app": {
            templateUrl: 'components/academic-output/partials/view.html',
            controller: 'GrailsEditController'
          },
        },
        data : {
          subTitle: "Main"
        },
      });
      $stateProvider.state('app.academicOutput.view.people', {
        url:          '/people',
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_people.html',
          },
        },
        data : {
          subTitle: "People"
        },
      });
      $stateProvider.state('app.academicOutput.view.publication', {
        url:          '/publication',
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_publication.html',
          },
        },
        data : {
          subTitle: "Publication"
        },
      });
      $stateProvider.state('app.academicOutput.view.finance', {
        url:          '/finance',
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_finance.html',
          },
        },
        data : {
          subTitle: "Finance"
        },
      });
      $stateProvider.state('app.academicOutput.view.compliance', {
        url:          '/compliance',
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_compliance.html',
          },
        },
        data : {
          subTitle: "Compliance"
        },
      });
      $stateProvider.state('app.academicOutput.view.all', {
        url:          '/all',
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_all.html',
          },
        },
        data : {
          subTitle: "View All"
        },
      });
    }]);
  }
);

