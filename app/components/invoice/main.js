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
    return angular.module('invoice', ['grails', 'search', 'kintUi'])
    .config(['$stateProvider', function($stateProvider) {
      // State for search.
      $stateProvider.state('app.invoice', {
        parent: 'app.componentSearch',
        url:   '^/invoice',
        grailsResource: 'Invoice',
        searchFields: [
//          {
//            'data'  : 'receivedDate',
//            'title' : "Date received"
//          },
          {
            'data'  : 'passedToFinance.value',
            'title' : "Passed to finance"
          },
          {
            'data'  : 'paidInFull.value',
            'title' : "Payment status"
          },
          {
            'data'  : 'paymentType.value',
            'title' : "Payment method"
          },
          {
            'data'  : 'filename',
            'title' : "Invoice file name"
//          },
//          {
//            'data'  : 'lastUpdated',
//            'title' : "Last updated"
          },
        ],
        views: {
          // Unnamed view.
          "" : {
            controller: 'SearchResultsController',
          },
          "search":{
            controller: 'SearchController',
            templateUrl: 'components/invoice/partials/search.html',
          },
          "invoice-nav@app" : {
            templateUrl: "components/invoice/partials/_nav.html",
          }
        },
        data : {
          title: "Invoice",
        }
      });
      $stateProvider.state('app.invoice.view', {
        url: '/:id',
        deps: [
          'components/invoice/CtrlInvoiceController.js',
          'components/invoice/CtrlCostItemController.js'
        ],
        views: {
          "@app": {
            templateUrl: 'components/invoice/partials/view.html',
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

