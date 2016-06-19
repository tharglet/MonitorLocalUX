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
          searchFields: [
            {
              'data'  : 'surname',
              'title' : "Surname"
            },
            {
              'data'  : 'firstName',
              'title' : "First Name(s)"
            },
            {
              'data'      : 'identifiers',
              'title'     : "ORCID",
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
              'data'      : 'personContactDetails',
              'title'     : "Depts",
              'orderable' : false,
              'render'    : function ( sData, type, oData, meta ) {

                if (type === 'display') {
                  var val = "";
                  if (sData && sData.length > 0) {
                    var list = $("<ul />");
                    // Output each identifier.
                    $.each (sData, function () {
                      var pcd = this;
                      list.append($("<li />").html(
                        "<strong>" + pcd.organisation.name + ":</strong>&nbsp;" + pcd.department
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
              'data'      : 'personContactDetails',
              'title'     : "Email Address",
              'orderable' : false,
              'render'    : function ( sData, type, oData, meta ) {

                if (type === 'display') {
                  var val = "";
                  if (sData && sData.length > 0) {
                    var list = $("<ul />");
                    // Output each identifier.
                    $.each (sData, function () {
                      var pcd = this;
                      list.append($("<li />").html(
                        pcd.emailAddress
                      ));
                    });

                    val = list.html();
                  }

                  return val;
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
            "person-nav@app" : {
              templateUrl: "components/person/partials/_nav.html",
            }
          },
          data : {
            title: "Person",
            requireLogin:true,
          }
        });
        $stateProvider.state('app.person.view', {
          url: '/:id',
          deps: [
            'components/person/CtrlPersonController.js',
          ],
          views: {
            "@app": {
              templateUrl: 'components/person/partials/view.html',
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

