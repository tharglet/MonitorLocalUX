/**
 * K-Int Angular module for UI elements.
 * Initially designed for bootstrap but in a manor that should be extendable for other,
 * frameworks.
 */

'use strict';

define (
  'kint-ui',
  [
   'angular-xeditable',
   'angular-aria',
   'angular-ui-router',
   'angular-ui-sortable',
   'angular-sanitize',
   'ui-select',
   'angular-messages',
  ],
  function() {
    
    // Define some prefixes and var names here.
    var directiveNamespace = "kintUi";

    // The module and the service.
    var kintUi = angular.module(directiveNamespace, ['xeditable', 'ngAria', 'ui.router', 'ui.sortable', 'ngSanitize', 'ui.select', 'ngMessages'])
    
    // Register directives.
    
    
    .run(['editableOptions', 'uiSelectConfig', function(editableOptions, uiSelectConfig){  
      
      // Set the theme of the xeditable widgets to be bootstrap 3.
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
      
      // UiSelect Globals.
      uiSelectConfig.theme = 'select2';
    }]);
    
    return kintUi;
  }
);