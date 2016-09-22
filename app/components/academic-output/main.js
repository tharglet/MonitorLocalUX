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
    return angular.module('academic-output', ['grails', 'search', 'kintUi'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.academicOutput', {
        parent: 'app.componentSearch',
        url:   '^/academic-output',
        grailsResource: 'AcademicOutput',
        searchFields: [
          {
            'data'      : 'identifiers',
            'title'     : "IDs",
            'orderable' : false,
            'render'    : function ( sData, type, oData, meta ) {
              
              var val = "";
              switch(type) {
                case 'display':
                  if (sData && sData.length > 0) {
                    var list = $("<ul />");
                    // Output each identifier.
                    $.each (sData, function () {
                      var cid = this;
                      list.append($("<li />").html(
                        "<strong>" + cid.identifier.namespace.value + ":</strong>&nbsp;" + cid.identifier.value
                      ));
                    });

                    val = $('<div />').append(list).html();
                  }
                  break;
                case 'export':
                default:
                  $.each (sData, function () {
                    var pcd = this;
                    val += (val.length > 0 ? "\n" : "") + cid.identifier.namespace.value + ": " + cid.identifier.value;
                  });
              }
              return val;
            }
          },
          {
            'data'  : 'publicationTitle',
            'title' : "Journal/Conference Title"
          },
          {
            'data'          : 'publisher.name',
            'title'         : 'Publisher',
            'orderable'     : false,
            "defaultContent": ''
          },
          {
            'data'          : 'workflowStatus',
            'title'         : 'Workflow Complete',
            'orderable'     : true,
            'render'        : function ( sData, type, oData, meta ) {

              if (type === 'display') {
                return sData === false ? "No" : "Yes";  
              } else {
                return sData;
              }
            }
          }
        ],
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "search": {
            controller: 'SearchController',
          },
          "ao-nav@app" : {
            templateUrl: "components/academic-output/partials/_nav.html",
          }
        },
        data : {
          title: "Academic Output",
        }
      });

      // Default config for un-named view.
      $stateProvider.state('app.academicOutput.view', {
        url: '/:id',
        deps: [
          'components/academic-output/CtrlAcademicOutputController.js',
          'components/academic-output/CtrlAOSidebarController.js',
          'components/academic-output/CtrlDOIValidationController.js'
        ],
        views: {
          "@app": {
            templateUrl: 'components/academic-output/partials/view.html',
            controller: 'GrailsEditController'
          },
          "sidebar@": {
            templateUrl: 'components/academic-output/partials/_sidebar.html',
            controller: 'AOSidebarController'
          },
        },
        data : {
          subTitle: "General"
        }
      });
      $stateProvider.state('app.academicOutput.view.people', {
        url:          '/people',
        deps: [
          'components/academic-output/CtrlAOPeopleController.js',
        ],
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_people.html',
            controller: 'AOPeopleController'
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
        deps: [
          'components/academic-output/CtrlAOFinanceController.js',
          'components/invoice/CtrlCostItemController.js'
        ],
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_finance.html',
            controller: 'AOFinanceController'
          },
        },
        data : {
          subTitle: "Finance"
        },
      });
      $stateProvider.state('app.academicOutput.view.compliance', {
        url:          '/compliance',
        deps: [
          'components/academic-output/CtrlAOComplianceController.js',
        ],
        views: {
          "": {
            templateUrl:  'components/academic-output/partials/_tab_compliance.html',
            controller: 'AOComplianceController'
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

