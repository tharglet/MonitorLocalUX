'use strict';
define(
  "search",
  [
   'jszip',
   'angular-ui-router',
   'datatables.net-bs',
   'datatables.net-buttons-bs',
   'datatables.net-buttons.colVis',
   'datatables.net-buttons.html5',
   'datatables.net-fixedheader',
   'datatables.net-colreorder',
   'datatables.net-responsive-bs',
   'grails',
   'angular-formly-templates-bootstrap'
  ],
  function (JSZip) {
    
    // The data-tables lib requires the JSZip library to be on the global path. Set it here.
    window.JSZip = JSZip;
    
    var mod = angular.module('search', ['ui.router', 'grails', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'ui.select', 'ngSanitize']);
    mod.config(['$stateProvider', function($stateProvider) {
      
      $stateProvider.state('app.componentSearch', {
        abstract: true,
        deps: [
          "components/search/CtrlSearchController.js",
          "components/search/CtrlSearchResultsController.js"
        ],
        data: {
          requirelogin:false,
        },
        views: {
          // Unnamed view at app state level...
          "@app" : {
            templateUrl: 'components/search/partials/search_results.html'
          }
        },        
      });
    }]);
    
    mod.run(['formlyConfig', function(formlyConfig) {
      // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
      formlyConfig.extras.removeChromeAutoComplete = true;
      
      // Configure custom types.
      formlyConfig.setType({
        name: 'ui-select-single',
        extends: 'select',
        templateUrl: 'ui-select-single.html'
      });
      formlyConfig.setType({
        name: 'ui-select-single-select2',
        extends: 'select',
        templateUrl: 'ui-select-single-select2.html'
      });
      formlyConfig.setType({
        name: 'ui-select-single-search',
        extends: 'select',
        templateUrl: 'ui-select-single-async-search.html'
      });

      formlyConfig.setType({
        name: 'ui-select-multiple',
        extends: 'select',
        templateUrl: 'ui-select-multiple.html'
      });
    }]);
    
    return mod;
  }
);
