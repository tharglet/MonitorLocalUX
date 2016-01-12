'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */
define(
  "about",     // JS module name (not the same as the angular module name.)
  ['search'],   // File locations can also be used instead of named includes.
    function(){
    // Create our angular module here.
    return angular.module('about', ['ui.router'])
      .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  
        // State for search.
        $stateProvider.state('app.componentSearch.about', {
          url:          '/about',
          data : {
            title: "About",
            subtitle: 'AboutSubtitleSearch',
            requireLogin: true
          }
        });
        
        // Default config for un-named view.
        $stateProvider.state('app.aboutView', {
          url:          '^/about/test',
          templateUrl:  'components/about/partials/main.html',
          data : {
        	  title: "About",
              subtitle: 'AboutSubtitleSearch',
            requireLogin: true
          },
          controller: ['$scope', '$state', function ($scope, $state) {
            console.log('execute about');
          }]
        });
      }]);
  }
);
