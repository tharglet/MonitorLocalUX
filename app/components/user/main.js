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
    .config(['$stateProvider', '$injector', function($stateProvider, $injector) {
      // State for search.
      $stateProvider.state('app.user', {
        parent: 'app.componentSearch',
        authRequired: 'ROLE_ADMIN',
        url:   '^/user',
        grailsResource: 'User',
        searchFields: [
          {
            'data'            : 'affiliations[0].org',
            'title'           : "Affiliations",
            "defaultContent"  : 'None'
          },
          {
            'data'            : 'affiliations[0].status',
            'title'           : "Approved?",
            "defaultContent"  : 'N/A',
            'orderable'       : true,
            'render'          : function ( sData, type, oData, meta ) {
              if (oData['affiliations'] && oData['affiliations'][0]) {
                if (type === 'display') {
                  if (sData === true || sData === "1") {
                    return "Yes";
                  } else {
                    return "<a class='approval-link' title='Click to approve this affiliation' data-approval-id='" + oData.affiliations[0]['id'] + "' >No</a>";
                  }
                } else {
                  return sData;
                }
              }
            }
          }
        ],
        extendSearch: ['searchResults', '$http', function(searchResults, $http) {
          
          // Add the click events to all the links.
          searchResults.on( 'click', 'a.approval-link', function (e) {
            e.preventDefault();
          });
        }],
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "user-nav@app" : {
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

