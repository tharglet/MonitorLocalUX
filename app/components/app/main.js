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
    .config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $couchPotatoProvider, $authProvider) {
   
      couchPotato.configureApp(app);


      // Sattelizer likes us to have the host of the callback be the same origin as the site we are serving. Thats very nice when we are serving the
      // app from //monitorlocal.jisc.ac.uk/redirect but when we're developing the odds are that we are serving from localhost:9090. So we switch the URL
      // AND the clientId [Since the ShibOauth bridge *currently* only allows one callback URL per registered client.
      // var callback_url = 'http://monitorlocal.jisc.ac.uk/redirect';
      var callback_url = 'http://localhost:9090/redirect/sob';

      console.log("Using callback URL %s",callback_url);


      console.log("Config google");
      $authProvider.google({
        clientId: 'GooglelientId',
        url: callback_url + "google"
      });

      console.log("Config twitter");
      $authProvider.twitter({
        clientId: 'twitterClientId',
        url: callback_url + "twitter"
      });

      // Parameters that can be set for oauth2 provider
      // $authProvider.oauth2({
      //   url: null,
      //   name: null,
      //   scope: null,
      //   scopeDelimiter: null,
      //   clientId: null,
      //   redirectUri: null,
      //   popupOptions: null,
      //   authorizationEndpoint: null,
      //   responseParams: null,
      //   requiredUrlParams: null,
      //   optionalUrlParams: null,
      //   defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
      //   responseType: 'code'
      // });

      // See OAuth2 RFC:: http://tools.ietf.org/html/rfc6749
      $authProvider.oauth2({
        name: 'sob',  // K-int Shib-OAuth2 GW
        url: callback_url+'sob',
        // redirectUri: 'http://monitorlocal.jisc.ac.uk/redirect',
        redirectUri: 'http://localhost:9090/redirect',
        clientId: 'monitorLocalDev',
        authorizationEndpoint: 'https://www.kbplus.ac.uk/sobtest/oauth/authorize',
        scope:'read'
      });


      console.log("OK");

   
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
