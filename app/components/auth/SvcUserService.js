'use strict';

/**
 * Follow the javascript module implementation.
 * This academic-output javascript module registers an angular module.
 * We can also define states here as well as the controllers for the AcademicOuput.
 */

define(
  ['app'],   // File locations can also be used instead of named includes.
  function (app) {   // Module instantiator. Should return an object that will be stored against the name of this module.
    return app.registerService('UserService', ['$log', '$window', function($log, $window) {
    
      /**
       * @ngDoc method
       * @name login
       * @methodOf UserService
       * @param user {Object} the user object.
       * @returns {Object} the user object.
       * @description login a user.
       */
      this.login = function(user) {
          $log.debug("login %o",user);
          $window.localStorage.currentUser = JSON.stringify(user);
          // TODO: this seems a little unnecessary, can probably just return user.
          // return JSON.parse($window.localStorage.currentUser);
          return user;
      };

      /**
       * @ngDoc method
       * @name currentUser
       * @methodOf UserService
       * @returns {Object} the user object or null.
       * @description get the current user object.
       */
      this.currentUser = function() {
          $log.debug("Parsing local storage current user");
          var user = JSON.parse($window.localStorage.currentUser);
          return user;
      };

      /**
       * @ngDoc method
       * @name logout
       * @methodOf UserService
       * @description logout the current user.
       */
      this.logout = function() {
          $log.debug("Logout");
          delete $window.localStorage.currentUser;
      };

      this.update = function(user) {
          $log.debug("update %o",user);
          $window.localStorage.currentUser = JSON.stringify(user);
      };
    }]);
  }
);