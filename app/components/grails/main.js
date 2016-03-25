/**
 * K-Int Angular module for interaction with Grails backend.
 * TODO: Self config after initialisation with a valid url that has the GrailsTools
 * plugin installed.
 */

'use strict';

define (
  ['./component-edit-ctrl', './DirectiveRefdata', 'angular-resource', './resource-manager' ],
  function(ComponentEditController, RefdataDirective) {
    
    var directiveNamespace = "kint";
    var grailsResourcePriovderName = 'grailsResource';
    
    var ngGr = angular.module('grails', ['ngResource']);
    ngGr.service('GrailsService', ['$resource', '$http', '$q', 'appConfig', ResourceManager]);
    ngGr.controller('GrailsEditController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', grailsResourcePriovderName, ComponentEditController]);
    ngGr.directive(directiveNamespace + 'Refdata', [RefdataDirective]);
    
    // If the UI Router is present then we should add a decorator to allow for,
    // GrailsResource resolution.
    ngGr.config(['$injector', function ($injector) {
      if($injector.has('$stateProvider')){
        var $stateProvider = $injector.get('$stateProvider');
        
        // Lets add a lazy dependencies decorator to the state provider.
        $stateProvider.decorator(grailsResourcePriovderName, function (state) {
          
          if (state[grailsResourcePriovderName]) {
            var typeName = state[grailsResourcePriovderName];
            var depsResolutionKey = grailsResourcePriovderName;
            
            
            // Add the resolve object if necessary.
            if (!state.resolve) {
              state.resolve = {};
            }
            
            // Now we need to add the resolve property.      
            state.resolve[depsResolutionKey] = ['GrailsService', function (grails){
              return grails.r (typeName);
            }];
          }
        });
      }
    }]);
    
    return ngGr;
  }
);