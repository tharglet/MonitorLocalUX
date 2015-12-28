'use strict';

define(
  'app',
  [
   'auth',
   'academic-output',          // JS Module dependencies, ensures the code is included.
   'search',
  ],                
  function () {
    
    var app = angular.module('app', [
      'satellizer',
      'ngAnimate',                    // Angular Module dependencies. This will initialise these modules too.
      'ngAria',
      'scs.couch-potato',
      'ui.router',
      'academic-output',
      'search',
      'auth'
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
    .run(['$couchPotato', '$state', '$stateParams', '$rootScope', '$log', 'satellizer.shared',
      function($couchPotato, $state, $stateParams, $rootScope, $log, shared) {
        // Use lazy run-time registration.
        app.lazy = $couchPotato;

        // These params are used regularly. Including them within the root scope will,
        // ensure they are available.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        console.log("main run");
 
        // Watch for state changes -- if we switch to a protected state, check that the user is authenticated. 
        // If not - send to the login page and store the toState so we can go back to it once auth has completed.
        $rootScope.$on('$stateChangeStart', function(ev, toState, toParams, fromState, fromParams) {
          console.log("routeChangeStart %o", toState);
          $log.debug('routeChangeStart %o', toState);
          if (toState) {
            if (toState.data && toState.data.requireLogin) {
              if (shared.isAuthenticated()) {
                $log.debug('User Logged In for secured resource');
              } else {
                $log.debug('user not logged in for secured resource');
                ev.preventDefault();
                $rootScope.pendingPath = toState;
                $state.go('app.login');
                // $location.path('/login');
              }
            }
            else {
              $log.debug('Non-secured resource');
            }
          }
 
          // If the user is authenticated, grab the current user and stash in rootScope
          if (shared.isAuthenticated()) {
            // $rootScope.currentUser = userService.currentUser();
          }
        });
      }
    ]);
    
    return app;
  }
);
