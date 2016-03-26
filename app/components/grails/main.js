/**
 * K-Int Angular module for interaction with Grails backend.
 * TODO: Self config after initialisation with a valid url that has the GrailsTools
 * plugin installed.
 */

'use strict';

define (
  ['./controllers/component-edit', './directives/val-lookup', 'angular-resource', './lib/resource-manager' ],
  function(ComponentEditController, RefdataDirective) {
    
    // Define some prefixes and var names here.
    var directiveNamespace = "kint";
    var grailsResourcePriovderName = 'grailsResource';
    

    // The module and the service.
    var ngGr = angular.module('grails', ['ngResource']);
    ngGr.service('GrailsService', ['$resource', '$http', '$q', 'appConfig', ResourceManager]);
    
    // The functions for the below are stored in different files. They are included above using
    // requirejs and they should return a method. That method can then be accessed by applied var name.
    ngGr.controller('GrailsEditController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', grailsResourcePriovderName, ComponentEditController]);
    ngGr.directive(directiveNamespace + 'ValLookup', ['$compile', '$templateRequest', RefdataDirective]);
    
    // If the UI Router is present then we should add a decorator to allow for,
    // GrailsResource resolution.
    ngGr.config(['$injector', function ($injector) {
      if($injector.has('$stateProvider')){
        var $stateProvider = $injector.get('$stateProvider');
        
        // Custom decorator to allow us to define Grails resource type directly on the state definition.
        // The resource will be resolved before the state is rendered and the resource made available for
        // injection using the name set in 'grailsResourcePriovderName' above.
        $stateProvider.decorator(grailsResourcePriovderName, function (state) {
          
          // Check if the state
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