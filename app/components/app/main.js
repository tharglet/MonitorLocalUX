'use strict';

define(
  'app',
  [ // Add all the dependents.
    "angular-couch-potato",
    'html5shiv',
    "satellizer",
    'angular-ui-router',
    'bootstrap-js',
//    'jisc-patterns-head',
//    'jisc-patterns-foot' SO: Commenting out for now as seems to be dependent on an unknown library
   
   // Component modules.
    'auth',
    'academic-output',
  ],                
  function (couchPotato) {
    
    var app = angular.module('app', [
      'scs.couch-potato',
      'satellizer',
      'ui.router',
      'auth',
      'academic-output',
    ])
    
    // CONSTANT USED TO GLOBALLY DISABLE AUTH
    .constant( 'NO_AUTH', true )
    
    .config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $couchPotatoProvider, $authProvider) {
   
      couchPotato.configureApp(app);


      // Sattelizer likes us to have the host of the callback be the same origin as the site we are serving. Thats very nice when we are serving the
      // app from //monitorlocal.jisc.ac.uk/redirect but when we're developing the odds are that we are serving from localhost:9090. So we switch the URL
      // AND the clientId [Since the ShibOauth bridge *currently* only allows one callback URL per registered client.
      // var callback_url = 'http://monitorlocal.jisc.ac.uk/redirect';
      var callback_url = 'http://localhost:9090/redirect/';

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
        // URL of the service the user is trying to authenticate for. Pass on info after closing OAuth2 popup window.
        url: 'http://localhost:8080/jwt/callback/sob',
        // redirectUri: 'http://monitorlocal.jisc.ac.uk/monitorLocalSvc/redirect',
        clientId: 'monitorLocalDev',
        // OAuth2 Endpoint
        authorizationEndpoint: 'https://www.kbplus.ac.uk/sobtest/oauth/authorize',
        // responseType:'token',
        responseType:'code',
        requiredUrlParams: ['scope','responseType'],
        // The URI that the OAuth service will redirect us to when completed.
        redirectUri: 'http://localhost:9090/redirect',
        // Tell sattelizer about this particular endpoint -- what the required, optional and  default URL Params are
        scope:['read']
      });


      console.log("OK");

      // Default home state.
      $stateProvider.state('app', {
        data: {
          title: "Home",
        },
        views : {
          "" : { // Un-named (default) view.
            controller: 'AppController',
            templateUrl: 'components/app/partials/home.html',
          },
          "breadcrumb" : {
            controller: 'BreadcrumbController',
            templateUrl: 'components/app/partials/crumb.html',
          },
        },
        url: '/',
        resolve: {
          // This is the important bit that loads a file when this route is in action. These files are only loaded when needed.
          deps: $couchPotatoProvider.resolveDependencies([
            'app/CtrlAppController',
            'app/CtrlBreadcrumbController'
          ])
        },
      });
   
      // Default to the homepage.
      $urlRouterProvider.otherwise('/');
    }])
    .run(['$couchPotato', '$state', '$stateParams', '$rootScope', '$log', 'satellizer.shared', 'NO_AUTH',
      function($couchPotato, $state, $stateParams, $rootScope, $log, shared, NO_AUTH) {
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
          $log.debug('routeChangeStart %o', toState);
          if (toState) {
            console.log("toState.data:%o",toState.data);
            if ( !NO_AUTH && toState.data && toState.data.requireLogin) {
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
 
          $rootScope.isAuthenticated = shared.isAuthenticated();

          // If the user is authenticated, grab the current user and stash in rootScope so we can access it in partials, for
          // example 
          if ($rootScope.isAuthenticated) {
            // $log.debug("Set current user to %o",userService.currentUser());
            $log.debug("user is authenticated -- payload %o",shared.getPayload());
            $rootScope.currentUser = shared.getPayload();
          }
          else {
            $rootScope.currentUser = { displayName : '', profilePic:'' };
          }
        });
      }
    ]);
    
    return app;
  }
);
