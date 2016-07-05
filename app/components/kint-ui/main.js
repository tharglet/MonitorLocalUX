/**
 * K-Int Angular module for UI elements.
 * Initially designed for bootstrap but in a manor that should be extendable for other,
 * frameworks.
 */

'use strict';
define (
  'kint-ui',
  [
   './directives/DrtvInputFeedback',
   './directives/DrtvInput',
   './directives/DrtvHelp',
   './directives/DrtvNotes',
   'angular-xeditable',
   'angular-aria',
   'angular-ui-router',
   'angular-ui-sortable',
   'angular-sanitize',
   'angular-bootstrap',
   'angular-datetime',
   'bootstrap-js',
   'ui-select',
   'angular-messages',
  ],
  function(DrtvInputFeedback,DrtvInput, DrtvHelp, DrtvNotes) {
    var theme = "bs3";
    
    // Define some prefixes and var names here.
    var directiveNamespace = "kintUi";
    var constPrefix = directiveNamespace.toUpperCase() + "_";

    // The module and the service.
    var kintUi = angular.module(directiveNamespace, ['xeditable', 'ngAria', 'ui.router', 'ui.sortable', 'ui.bootstrap', 'datetime', 'ngSanitize', 'ui.select', 'ngMessages'])
    
    // Register the theme here.
    .constant(constPrefix + "THEME", theme)
    
    // Register directives.
    .directive(directiveNamespace + 'InputFeedback', [constPrefix + "THEME", '$templateRequest', '$compile', DrtvInputFeedback])
    .directive(directiveNamespace + 'Input', [constPrefix + "THEME", '$templateRequest', '$compile', DrtvInput])
    .directive(directiveNamespace + 'Help', [constPrefix + "THEME", '$templateRequest', '$compile', '$q', '$http', '$sce', DrtvHelp])
    .directive(directiveNamespace + 'Notes', [constPrefix + "THEME", DrtvNotes])
    
    .run(['editableOptions', 'uiSelectConfig', function(editableOptions, uiSelectConfig){
      
      // Set the theme of the xeditable widgets to be bootstrap 3.
      editableOptions.theme = theme; // bootstrap3 theme. Can be also 'bs2', 'default'
      
      // UiSelect Globals.
      uiSelectConfig.theme = 'select2';
    }]);
    
    return kintUi;
 }
);