/**
 * Notification stacks.
 */

'use strict';

define (
  [
    "pnotify",
    "pnotify.animate",
    "pnotify.desktop",
    "pnotify.buttons",
    "pnotify.confirm",
    "pnotify.nonblock",
    "pnotify.callbacks"
  ],
  function(notify) {
    var mainContent = {};
    mainContent.prototype._defaults = {
      stack: this.stack
    };
    mainContent.prototype.stack = {
      "dir1":"down",
      "dir2":"right",
      "push":"top",
      "firstpos1": 0,
      "firstpos2": 0,
      "context": $("#main")
    };
    
    return {
      showSaveNotification : function (notice) {
        new notify($.extend(true, {}, mainContent._defaults, notice));
      }
    };
  }
);