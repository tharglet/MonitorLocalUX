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
                  var val = null;
                  if (sData && sData.length > 0) {
                    // Output each identifier.
                    for (var i=0; i<sData.length && !val; i++) {
                      var cid = sData[i];
                      if (cid.identifier.namespace.value == 'orcid') {
                        val = cid.identifier.value;
                      }
                    }
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
                        (pcd.organisation ? "<strong>" + pcd.organisation.name + (pcd.department ? ":" : "") + "</strong>" : "") + (pcd.department ? "&nbsp;" + pcd.department.value : "")
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
                      if (pcd.emailAddress) {
                        list.append($("<li />").html(
                          pcd.emailAddress
                        ));
                      }
                    });

                    if (list.children().length > 0) {
                      val = list.html();
                    }
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
            "search":{
              controller: 'SearchController',
              templateUrl: 'components/person/partials/search.html',
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

