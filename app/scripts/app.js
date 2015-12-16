'use strict';

/**
 * @ngdoc overview
 * @name monitorLocalUxApp
 * @description
 * # monitorLocalUxApp
 *
 * Main module of the application.
 */
var app = angular.module('monitorLocalUxApp', [
  'ngAnimate',
  'ngAria',
  'scs.couch-potato',
  'ui.router',
  'monitorLocalUxApp.AcademicOutputs'
])
.config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', function($stateProvider, $urlRouterProvider) {
  
  couchPotato.configureApp(app);
  
  // Default to the homepage.
  $urlRouterProvider.otherwise('/');
  
  // Default home state.
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'scripts/partials/home.html'
  });
  
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'scripts/partials/about.html'
  });
}])
.run([
  '$couchPotato', '$state', '$stateParams', '$rootScope',
  function($couchPotato, $state, $stateParams, $rootScope) {
    // Use lazy run-time registration.
    app.lazy = $couchPotato;
  
    // These params are used regularly. Including them within the root scope will,
    // ensure they are available.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
