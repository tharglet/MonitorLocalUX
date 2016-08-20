'use strict';

define(
  'app',
  [ // Add all the dependencies.
    'angular-couch-potato',
    'notifications',
    'moment',
    'html5shiv',
    "satellizer",
    'angular-ui-router',
    'bootstrap-js',
    'angular-bootstrap-datetimepicker-directive',
    './config',

    // Component modules.
    'auth',
    'academic-output',
    'organisation',
    'invoice',
    'person',
    'grant',
    'budget',
    'profile',
    'user'
  ],
  function (couchPotato, notify, moment) {
    
    // Default application object. We can use these references throughout to keep in sync.
    var applicationData = {};

    var app = angular.module('app', [
      'config',
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
      'grant',
      'budget',
      'profile',
      'user'
    ])

    // CONSTANT USED TO GLOBALLY DISABLE AUTH
    // .constant( 'NO_AUTH', false )

    .config(['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', '$authProvider', '$httpProvider', 'datetimepickerProvider', 'userServiceProvider', 'appConfig', 
             function($stateProvider, $urlRouterProvider, $couchPotatoProvider, $authProvider, $httpProvider, datetimepicker, userServiceProvider, appConf) {

      $httpProvider.interceptors.push(['$q', '$notifications', function($q, $notifications) {
        return {
          responseError: function(error) {

            switch (error.status) {
              case -1:
                $notifications.showError ({
                  'title':  "Service Unreachable",
                  'text':   "The Monitor Local service is unreachable.",
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
                
              // Server error.
              case 500 :

                if ("data" in error && "message" in error.data) {

                  $notifications.showError ({
                    'title':  "Server Error",
                    'text':   error.data.message
                  });
                  break;
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
                  // Only act on success code.
                  if (response.status === 201) {
                    if (typeof response.data ==='object' && !angular.isArray(response.data) && response.data.id) {
                      var el = response.data;                  
                      $notifications.showSuccess ({
                        'title':  "Successfully saved",
                        'text':   "'" + el.name + "' successfully created."
                      });
                    }
                  }
                  break;
                case 'PUT'   :
                  // Only act on success code.
                  if (response.status === 200) {
                    if (typeof response.data ==='object' && !angular.isArray(response.data) && response.data.id) {
                      var el = response.data;                  
                      $notifications.showSuccess ({
                        'title':  "Successfully updated",
                        'text':   "Changes to '" + el.name + "' successfully saved."
                      });
                    }
                  }
                  break;
                case 'DELETE'   :
                  // No content. Now that the resource has gone we don't know anything about it..
                  if (response.status === 204) {
                    $notifications.showSuccess ({
                      'title':  "Successfully deleted resource",
                      'text':   "Resource has been permanently deleted.."
                    });
                  }
                  break;
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
      var callback_url = appConf.backend + '/jwt/callback/';

      console.log("Using callback URL %s",callback_url);


      console.log("Config twitter");
      $authProvider.twitter({
        clientId: 'twitterClientId',
        url: callback_url + "twitter"
      });

      console.log("Config SOB");
      // See OAuth2 RFC:: http://tools.ietf.org/html/rfc6749
      // See also -- K-Int internal documentaiton::
      // https://docs.google.com/document/d/18BOD9i4-Fiy-2dWgsh9SKwsUOgjyseGTGbbTk8Yf6Fc/edit
      $authProvider.oauth2({
        name: 'sob',  // K-int Shib-OAuth2 GW
        // URL of the service the user is trying to authenticate for. Pass on info after closing OAuth2 popup window.
        url: callback_url + 'sob',
        redirectUri: ( window.location.origin || window.location.protocol + '//' + window.location.host ) + '/redirect',
        // redirectUri: 'http://localhost:9090/redirect',
        clientId: 'monitorLocal',
        // OAuth2 Endpoint
        // authorizationEndpoint: 'https://authsvc.k-int.com/uaa/oauth/authorize',
        authorizationEndpoint: 'https://www.kbplus.ac.uk/sob/oauth/authorize',
        // responseType:'token',
        responseType:'code',
        requiredUrlParams: ['scope','responseType'],
        // The URI that the OAuth service will redirect us to when completed.
        // redirectUri: 'http://localhost:9090/redirect',
        // Tell sattelizer about this particular endpoint -- what the required, optional and  default URL Params are
        // scope:['read', 'write', 'delete'],
        // scopeDelimiter: ',',
        // scope:['openid', 'profile', 'email']
        scope:['write'],
      });

      console.log("Configure google");
      $authProvider.google({
        clientId: '186678964269-tajnf5mojsdsa4mk66846apd0d0adc9q.apps.googleusercontent.com',
        // This is where google will redirect the browser after the user authenticates. For development it's localhost,
        // for production, the live server and for test the test server
        // redirectUri: 'http://localhost:8080/cesvc/oauth/callback/google'
        // url: 'http://localhost:8080/cesvc/oauth/callback/google'
        url: callback_url + "google",
        scope:['openid', 'profile', 'email']
      });

      console.log("OK");
      
      // Add some basic settings..
      angular.merge(applicationData, {
        config: angular.copy(appConf),
        user : {
          name: "Guest"
        }
      });
      userServiceProvider.setStorage ( applicationData );

      // Default app abstract state.
      $stateProvider.state('app', {
        abstract: true,
        authRequired: true,
        deps: [
          'app/CtrlAppController'
        ],
        views : {
          "app": {
            controller: 'AppController',
          }
        },
        resolve: {
          applicationSettings: ['$rootScope', '$http', 'appConfig', function ($rootScope, $http, appConfig) {
            
            // Grab straight from the root scope.
            if ( typeof $rootScope.application.currency == 'undefined' ) {
              return $http({
                method: 'GET',
                url: appConfig.backend + '/application/settings',
                headers: {
                  'Accept': 'application/json'
                },
              }).then (function (applicationSettings) {
                angular.merge($rootScope.application, applicationSettings.data);
              });
            } else {
              return $rootScope.application;
            }
          }]
        }
      });

      $stateProvider.state('app.dash', {
        url: '/',
        data: {
          title: "Welcome",
        },
        templateUrl: 'components/app/partials/home.html',
      });

      // Default to the homepage.
      $urlRouterProvider.otherwise('/');
    }])
    .run(['$couchPotato', '$state', '$stateParams', '$rootScope', '$http', 'satellizer.shared', 
      function($couchPotato, $state, $stateParams, $rootScope, $http) {


        $http.defaults.headers.common["Binding-Source"] = 'ng-app';

        // Use lazy run-time registration
        app.lazy = $couchPotato;

        // These params are used regularly. Including them within the root scope will,
        // ensure they are available.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        console.log("main run");

        $rootScope.application = applicationData;
      }
    ]);

    return app;
  }
);
