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
    .run(['$couchPotato', '$state', '$stateParams', '$rootScope', '$log',
      function($couchPotato, $state, $stateParams, $rootScope, $log) {
        // Use lazy run-time registration.
        app.lazy = $couchPotato;

        // These params are used regularly. Including them within the root scope will,
        // ensure they are available.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        console.log("main run");
 
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
                $location.path('/login');
              }
            }
            else {
              $log.debug('Non-secured resource');
            }
          }
 
          // if (shared.isAuthenticated()) {
            // $rootScope.currentUser = userService.currentUser();
          // }
        });
      }
    ]);
    
    return app;
  }
);
