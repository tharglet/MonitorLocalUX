/**
 * K-Int Angular module for interaction with Grails backend.
 * TODO: Self config after initialisation with a valid url that has the GrailsTools
 * plugin installed.
 */

'use strict';

define (
  ['./component-edit-ctrl', 'angular-resource', './resource-manager'],
  function(ComponentEditController) {
    var ngGr = angular.module('grails', ['ngResource']);
    ngGr.service('GrailsService', ['$resource', ResourceManager]);
    ngGr.controller('GrailsEditController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'GrailsService', 'appConfig', ComponentEditController]);
    return ngGr;
  }
);