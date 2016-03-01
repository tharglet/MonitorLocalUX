'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "academic-output",     // JS module name (not the same as the angular module name.)
  [
   'angular-ui-router',
   'angular-couch-potato',
   'search'
  ],
  function (Finance) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    
    // Create our angular module here.
    return angular.module('academic-output', ['ui.router', 'scs.couch-potato', 'search'])
    .config(['$stateProvider', '$couchPotatoProvider', function($stateProvider,$couchPotatoProvider) {
      // State for search.
      $stateProvider.state('app.academicOutput', {
        parent: 'app.componentSearch',
        url:   '^/academic-output',
        data : {
          title: "Academic Output",
          requirelogin:false,
        },
      });
                      
      // Default config for un-named view.
      $stateProvider.state('app.academicOutput.view', {
        url:          '/:id',
        templateUrl:  'components/academic-output/partials/main.html',
        data : {
          title: "Academic Output Details",
          requirelogin:false,
        },
      });
    }]);
  }
);

