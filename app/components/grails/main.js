/**
 * K-Int Angular module for interaction with Grails backend.
 * TODO: Self config after initialisation with a valid url that has the GrailsTools
 * plugin installed.
 */

'use strict';

define (
  [
    './controllers/CtrlComponentEdit',
    './directives/DrtvComponentLookup',
    './directives/DrtvRefdataLookup',
    './directives/DrtvLiveValidator',
    './directives/DrtvIdentifier',
    'angular-resource',
    './lib/LibResourceManager' ],
  function(ComponentEditController, ComponentLookupDirective, RefdataLookupDirective, ValidatorDirective, IdentifierDirective) {
    
    // Define some prefixes and var names here.
    var directiveNamespace = "kint";
    var grailsResourceProviderName = 'grailsResource';
    var contextVariableName = 'context';

    // The module and the service.
    var ngGr = angular.module('grails', ['ngResource']);
    ngGr.service('GrailsService', ['$resource', '$http', '$q', 'appConfig', ResourceManager]);
    
    // Register the constant.
    ngGr.constant("grailsResourceProviderName", grailsResourceProviderName);
    
    // The functions for the below are stored in different files. They are included above using
    // requirejs and they should return a method. That method can then be accessed by applied var name.
    ngGr.controller('GrailsEditController', ['$rootScope', '$scope', contextVariableName, ComponentEditController]);
    ngGr.directive(directiveNamespace + 'ComponentLookup', ['$compile', '$templateRequest', '$parse', ComponentLookupDirective]);
    ngGr.directive(directiveNamespace + 'RefdataLookup', ['$compile', '$templateRequest', RefdataLookupDirective]);
    ngGr.directive(directiveNamespace + 'Identifier', ['$compile', '$templateRequest', '$parse', '$filter', IdentifierDirective]);
    ngGr.directive(directiveNamespace + 'Validate', ['$q', ValidatorDirective]);
    
    // If the UI Router is present then we should add a decorator to allow for,
    // GrailsResource resolution.
    ngGr.config(['$injector', function ($injector) {
      
      if($injector.has('$stateProvider')){
        var $stateProvider = $injector.get('$stateProvider');
        
        // Custom decorator to allow us to define Grails resource type directly on the state definition.
        // The resource will be resolved before the state is rendered and the resource made available for
        // injection using the name set in 'grailsResourceProviderName' above.
        $stateProvider.decorator(grailsResourceProviderName, function (state) {
          
          // Add the resolve object if necessary.
          if (!state.resolve) {
            state.resolve = {};
          }
                     
          // Now we need to add the resolve property.
          if (state[grailsResourceProviderName]) {
            state.resolve[grailsResourceProviderName] = ['GrailsService', function (grails) {
              var typeName = state[grailsResourceProviderName];
              return grails.r (typeName);
            }];
          }
          
          // Because composite states inherit from their parents, we should only run if the parent does not include
          // these params, as it will have fired there already.
          this.ownParams.$$parent;

          // Add another property that fetches a resource if the state param of ID is set.
          if (state.ownParams && "id" in state.ownParams && !(state.ownParams.$$parent && "id" in state.ownParams.$$parent)) {
            state.resolve[contextVariableName] = ['$stateParams', grailsResourceProviderName, function ($stateParams, resource) {
              
              if (resource) {
                var id = $stateParams.id;
                if (id == "create") {
                  
                  return resource.create().$promise;
                  
                } else {
                
                  // Resolves before changing the state.
                  return resource.get({id: id}).$promise;
                }
              }
              
              // Set the context to empty object.
              return null;
            }];
          }
          
          return state[grailsResourceProviderName];
        });
      }
    }])
  ;
    
  // Debounce method for ensuring we only run a method once.
  ngGr.factory('debounce', function($timeout) {
    return function(callback, interval) {
      var timeout = null;
      return function() {
        $timeout.cancel(timeout);
        timeout = $timeout(function() {
          callback.apply(this, arguments);
        }, interval);
      };
    };
  });
    
  return ngGr;
});