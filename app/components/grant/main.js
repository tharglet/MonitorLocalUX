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
    return angular.module('grant', ['grails', 'search', 'kintUi'])
      .config(['$stateProvider', function($stateProvider) {
        // State for search.
        $stateProvider.state('app.grant', {
          parent: 'app.componentSearch',
          url:   '^/grant',
          grailsResource: 'AoGrant',
          searchFields: [
            {
              'data'  : 'grantId',
              'title' : 'Grant code'
            },
            {
              'data'  : 'internalGrantId',
              'title' : "Internal project code"
            },
            {
              'data'  : 'funder.name',
              'title' : 'Funder'
            },
//            {
//              'data'  : '',
//              'title' : 'Funder group'
//            },
//            {
//              'data'  : 'lastUpdated',
//              'title' : 'Last updated'
//            },
//            {
//              'data'  : 'funder.fundingGroup',
//              'title' : 'Funding Group'
//            }
          ],
          views: {
            // Unnamed view.
            "" : {
              controller: 'SearchResultsController',
            },
            "search":{
              controller: 'SearchController',
            },
            "grant-nav@app" : {
              templateUrl: "components/grant/partials/_nav.html",
            }
          },
          data : {
            title: "Grant",
          }
        });
        $stateProvider.state('app.grant.view', {
          url: '/:id',
          views: {
            "@app": {
              templateUrl: 'components/grant/partials/view.html',
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

