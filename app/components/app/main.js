'use strict';

define(
  'app',
  [
   'academic-output',          // JS Module dependencies, ensures the code is included.
   'search',
  ],                
  function () {
    
    var app = angular.module('app', [
      'ngAnimate',                    // Angular Module dependencies. This will initialise these modules too.
      'ngAria',
      'scs.couch-potato',
      'ui.router',
      'academic-output',
      'search'
    ])
    .config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', function($stateProvider, $urlRouterProvider) {
   
      couchPotato.configureApp(app);
   
      // Default to the homepage.
      $urlRouterProvider.otherwise('/');

      // Default home state.
      $stateProvider.state('app', {
        abstract: true,
        views : {
          "main" : {
            controller: ['$rootScope', function ($rootScope) {
              console.log ("Default controller for app state.");
              if ($rootScope.$state.current) {
                // Add the states ass root classes.
                $rootScope.bodyClasses = $rootScope.$state.current.name.replace(/[\.\-]/ig, ' ').trim();
              }
            }],
          },
        },
      });
      
      $stateProvider.state('app.home', {
        url: '/',
        templateUrl: 'components/app/partials/home.html'
      });
    }])
    .run(['$couchPotato', '$state', '$stateParams', '$rootScope',
      function($couchPotato, $state, $stateParams, $rootScope) {
        // Use lazy run-time registration.
        app.lazy = $couchPotato;

        // These params are used regularly. Including them within the root scope will,
        // ensure they are available.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
 
        $rootScope.$on('$routeChangeStart', function(ev, next, curr) {
          $log.debug('routeChangeStart %o', next);
          if (next) {
            if (next.data && next.data.requireLogin) {
              if (shared.isAuthenticated()) {
                $log.debug('User Logged In for secured resource');
              } else {
                $log.debug('user not logged in for secured resource');
                ev.preventDefault();
                $rootScope.pendingPath = next;
                $location.path('/login');
              }
            }
            else {
              $log.debug('Non-secured resource');
            }
          }
 
          if (shared.isAuthenticated()) {
            // $rootScope.currentUser = userService.currentUser();
          }
        });
      }
    ]);
    
    return app;
  }
);
