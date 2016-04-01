/**
 * Notification stacks.
 */

'use strict';

define (
  'notifications',
  [
    "pnotify",
    "pnotify.animate",
    "pnotify.desktop",
    "pnotify.buttons",
    "pnotify.confirm",
    "pnotify.callbacks"
  ],
  function(notify) {

    notify.prototype.options.styling = "bootstrap3";
    notify.prototype.options.opacity = "0.65";

  // Define some pre-defined stacks.
    var stacks = {
      'bottom-right' : {
        "dir1":"left",
        "dir2":"up",
        "firstpos1": 25,
        "firstpos2": 0,
        context: $('#notifications')
      },
      'bottom-left' : {
        "dir1":"right",
        "dir2":"up",
        "firstpos1": 25,
        "firstpos2": 0,
        context: $('#notifications')
      },
      'top-left' : {
        "dir1":"right",
        "dir2":"down",
        "firstpos1": 25,
        "firstpos2": 25,
        context: $('#notifications')
      },
      'top-right' : {
        "dir1":"left",
        "dir2":"down",
        "firstpos1": 25,
        "firstpos2": 25,
        context: $('#notifications')
      }
    };
    
    // Message defaults.
    var mainMessages = {
      'defaults-error' : {
        type: "error",
        hide: false,
        buttons: {
          closer: true,
          sticker: false
        },
        opacity: "0.65",
        stack : stacks['bottom-right'],
      }
    };
    
    // The api to expose.
    var public_api = {
      
      showError : function (notice) {
        var n = $.extend(
          true,
          {},
          mainMessages['defaults-error'],
          notice
        );
        
        // Create the Pnofity instance.
        n = new notify(n);
        
        // Return it so it can be extended by the caller.
        return n;
      }
    };
    
    // Register a provider here that will return the api.
    if (angular !== 'undefined') {
      // Let's add a module and register the provider..
      angular.module('notify', [])
      .provider('$notifications', [ function() {
        this.$get = [ function() {
          
          return public_api;
        }];
      }]);
    }
    
    
    // Return directly for direct injection.
    return public_api;
  }
);