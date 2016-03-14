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
    var mainContent = {
      _defaults : {
        addclass: "notification-stack-bar-bottom",
        styling: 'bootstrap3',
        width: '100%',
        height: 125,
        stack : {
          "dir1":"up",
          "dir2":"right",
          "width": "100%",
          "spacing1": 0,
          "spacing2": 0
        }
      }
    };
    
    return {
      showSaveNotification : function (notice, onConfirm, onCancel) {
        var n = $.extend(true,
          {},
          mainContent._defaults,
          {
            title: 'Save Changes',
            text: 'You have made changes to this component. Your changes will not be saved until you click save.',
            hide: false,
            confirm: {
                confirm: true
            },
            hide: false,
            buttons: {
              closer: false,
              sticker: false
            }
          },
          notice
        );
        
        n.stack.context = $('body');
        
        n = new notify(n);
        
        if (typeof onConfirm === 'function') {
          n.get().on('pnotify.confirm', onConfirm);
        }
        if (typeof onCancel === 'function') {
          n.get().on('pnotify.cancel', onCancel);
        }
        
        return n;
      }
    };
  }
);