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
//        authRequired: 'ROLE_ADMIN',
        url:   '^/organisation',
        grailsResource: 'Org',
        searchFields: [
          {
            'data'      : 'identifiers',
            'title'     : "IDs",
            'orderable' : false,
            'render'    : function ( sData, type, oData, meta ) {

              if (type === 'display') {
                var val = "";
                if (sData && sData.length > 0) {
                  var list = $("<ul />");
                  // Output each identifier.
                  $.each (sData, function () {
                    var cid = this;
                    list.append($("<li />").html(
                      "<strong>" + cid.identifier.namespace.value + ":</strong>&nbsp;" + cid.identifier.value
                    ));
                  });

                  val = list.html();
                }

                return val;
              } else {
                return sData;
              }
            }
          },
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
          "search":{
            controller: 'SearchController'
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
//        authRequired: 'ROLE_ADMIN',
        views: {
          "@app": {
            templateUrl: 'components/organisation/partials/view.html',
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

