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
            'data'            : 'orgAffiliations.org.name',
            'title'           : "Affiliations",
            "defaultContent"  : 'None',
            "sortable"        : false
          },
          {
            'data'            : 'orgAffiliations.status',
            'title'           : "Status",
            "defaultContent"  : 'N/A',
            "sortable"        : false,
            'render'          : function ( sData, type, oData, meta ) {
              if (type === 'display') {
                
                switch (sData) {
                  case 0: return "Pending (<a class='approval-link' title='Click to approve this affiliation' data-approval-id='" + oData.orgAffiliations['id'] + "' data-approval-val='1' >Approve</a> / "
                    + "<a class='approval-link' title='Click to reject this affiliation' data-approval-id='" + oData.orgAffiliations['id'] + "' data-approval-val='2' >Reject</a>)";
                    break;
                    
                  case 2: return "Rejected (<a class='approval-link' title='Click to approve this affiliation' data-approval-id='" + oData.orgAffiliations['id'] + "' data-approval-val='1' >Approve</a>)";
                    break;
                  
                  case 1:
                  case 3: return "Approved (<a class='approval-link' title='Click to reject this affiliation' data-approval-id='" + oData.orgAffiliations['id'] + "' data-approval-val='2' >Reject</a>)";
                    break;
                    
                  default:
                    return "Unknown";
                }
              } else {
                return sData;
              }
            }
          }
        ],
        extendSearch: ['searchResults', '$rootScope', '$state', '$http', '$notifications', 'appConfig', function(searchResults, $scope, $state, $http, $notifications, appConfig) {
          
          // Add the click events to all the links.
          searchResults.on( 'click', 'a.approval-link', function (e) {
            e.preventDefault();
            
            // Grab the link.
            var t = $(e.target);
            
            $http({
              
              method: 'POST',
              url:    appConfig.backend + '/application/setAffiliationStatus',
              params:   {
                aid: t.attr('data-approval-id'),
                s: t.attr('data-approval-val'),
              }
            }).then(function (response) {
              
              if (response.data.status === 0) {
                // Show success.
                $notifications.showSuccess ({
                  'title':  "Success",
                  'text':   response.data.message,
                });
              } else {
                $notifications.showError ({
                  'title':  "Error",
                  'text':   response.data.message,
                });
              }
              
              // To get the application to redownload we can clear the currency data.
              angular.copy({}, $scope.application.currency);
              return $state.reload('app');
              
            });
          });
        }],
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "search":{
            controller: 'SearchController'
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

