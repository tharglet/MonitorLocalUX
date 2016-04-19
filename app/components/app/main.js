'use strict';

define(
  'app',
  [ // Add all the dependencies.
    'angular-couch-potato',
    './config',
    'notifications',
    'moment',
    'html5shiv',
    "satellizer",
    'angular-ui-router',
    'bootstrap-js',
    'angular-bootstrap-datetimepicker-directive',

    // Component modules.
    'auth',
    'academic-output',
    'organisation',
    'invoice',
    'person',
    'funder',
    'grant'
  ],
  function (couchPotato, conf, notify, moment) {

    var app = angular.module('app', [
      'scs.couch-potato',
      'satellizer',
      'ui.router',
      'notify',
      'datetimepicker',
      'auth',
      'academic-output',
      'organisation',
      'invoice',
      'person',
      'funder',
      'grant'
    ])

    // CONSTANT USED TO GLOBALLY DISABLE AUTH
    .constant( 'NO_AUTH', true )
    .constant( "appConfig", conf )

    .config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', '$authProvider', '$httpProvider', 'datetimepickerProvider', 'appConfig', function($stateProvider, $urlRouterProvider, $couchPotatoProvider, $authProvider, $httpProvider, datetimepicker, appConf) {

      $httpProvider.interceptors.push(['$q', '$notifications', function($q, $notifications) {
        return {
          responseError: function(error) {

            switch (error.status) {
              case -1:
                $notifications.showError ({
                  'title':  "Service Unreachable",
                  'text':   "The Monitor Local service is unreachable.",
                  hide: false,
                  buttons: {
                    closer: false,
                  }
                });
                break;
                
              // Validation error on save.
              case 422 :

                if ("data" in error && "_embedded" in error.data && "errors" in error.data['_embedded']) {

                  var messages = angular.element("<div />");
                  angular.forEach(error.data['_embedded'].errors, function( error_entry ){
                    angular.element('<p />').text(error_entry.message).appendTo(messages);
                  });

                  $notifications.showError ({
                    'title':  "There were errors in your submission.",
                    'text':   messages.html(),
                    buttons: {
                      closer: false,
                    }
                  });
                }
                break;
            }

            // We should still reject the request.
            return $q.reject(error);
          },
          'response': function( response ) {
            
            // First we use the config object to check whether this was a PUT or POST made to update/add a resource
            // respectively. We only act on those types here.
            if (response && response.config && response.config.data && response.config.data.$$isResource === true) {
              
              var conf = response.config;
              // Check the method.
              var update = true;
              switch (conf.method.toUpperCase()) {
                case 'POST'  :
                  // New resource.
                  update = false;
                case 'PUT'   :
                  // Only act on success code.
                  if (response.status === 200) {
                    if (typeof response.data ==='object' && !angular.isArray(response.data) && response.data.id) {
                      var el = response.data;                  
                      $notifications.showSuccess ({
                        'title':  "Successfully " + (update ? "updated" : "saved"),
                        'text':   (update ? "Changes to " : "") + "'" + el.name + "' successfully " + (update ? "saved." : "created.")
                      });
                    }
                  }
              }
            }
            
            // Return the repsponse to allow for successful propegation.
            return response;
          },
        };
      }]);

      couchPotato.configureApp(app);

      // Lets add a lazy dependencies decorator to the state provider.
      $stateProvider.decorator('deps', function (state) {

        var tempKey;
        var depsResolutionKey = tempKey = 'deps';
        var count = 1;
        while (state.resolve && state.resolve[tempKey]) {

          tempKey = depsResolutionKey + count;
        }
        depsResolutionKey = tempKey;

        // Add the resolve object if necessary.
        if (!state.resolve) {
          state.resolve = {};
        }

        // Now we need to add the resolve property.
        state.resolve[tempKey] = $couchPotatoProvider.resolveDependencies(state.deps);

        return state.deps;
      });

      // Date pickers...
      datetimepicker.setOptions({
        format: "DD/MM/YYYY",
        extraFormats: [moment.ISO_8601]
      });

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

      // Default app abstract state.
      $stateProvider.state('app', {
        abstract: true,
        deps: [
          'app/CtrlAppController'
        ],
        views : {
          "app": {
            controller: 'AppController',
          }
        },
      });

      $stateProvider.state('app.dash', {
        url: '/',
        data: {
          title: "Dashboard",
        },
        templateUrl: 'components/app/partials/home.html',
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
            $rootScope.currentUser = { name : '', profilePic:'' };
          }
        });
      }
    ]);

    return app;
  }
);
