'use strict';

/**
 * Follow the javascript module implementation. This academic-output javascript
 * module registers an angular module. We can also define states here as well as
 * the controllers for the AcademicOuput.
 */

define(
  function () {
    return function() {
      var storage = {};
      
      this.setStorage = function (val) {
        storage = val;
      }; 
      this.$get = ['$log', function($log) {
        return {
    
          /**
           * @ngDoc method
           * @name currentUser
           * @methodOf UserService
           * @returns {Object} the user object or null.
           * @description get the current user object.
           */
          currentUser : function() {
              $log.debug("UserService::Parsing current user");
              var user = storage.user;
              return user;
          },
    
          /**
           * @ngDoc method
           * @name logout
           * @methodOf UserService
           * @description logout the current user.
           */
          logout : function() {
              $log.debug("UserService::Logout");
              
              // Keeps the reference alive but removes the data.
              angular.copy({}, storage.user);
          },
    
          update : function(user) {
              $log.debug("UserService::update %o",user);
              if (!storage.user) {
                storage.user = {};
              }
              angular.merge(storage.user, user);
              storage.user;
          },
          
          isAnonymous : function (user) {
            user = user | currentUser();
            return hasRole ('ROLE_ANONYMOUS', user);
          },
          
          hasRole : function (roleType, user) {
            user = user | currentUser();
            
            // Grab the roles.
            var roles = getRoles(user);
            
            // Check for a match.
            var found = false;
            var type = roleType.toUpperCase();
            for (var i=0; i<roles.length && !found; i++) {
              found = roles[i]['authority'] == type;
            }
            return found;
          },
          
          getRoles: function (user) {
            user = user | currentUser();
            if (user) {
              // Get the roles.
              return user.authorities | [];
            }
            return [];
          }
        }
        }];
      };
    }
  );
