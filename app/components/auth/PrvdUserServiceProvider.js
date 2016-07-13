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
      this.$get = ['$log', '$injector', function($log, $injector) {
        
        // Use the injector service to conditionally get the state provider.
        var $state = $injector.has('$state') ? $injector.get('$state') : null;
        
        var $auth = $injector.has('$auth') ? $injector.get('$auth') : null;
        
        return {
    
          /**
           * @ngDoc method
           * @name currentUser
           * @methodOf UserService
           * @returns {Object} the user object or null.
           * @description get the current user object.
           */
          currentUser : function() {
              $log.debug("UserService::Parsing current user from storage %o",storage.user);
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
              
              // Do the logout.
              $auth && $auth.logout();
              
              // Keeps the reference alive but removes the data.
              angular.copy({}, storage.user);
          },
    
          update : function(user) {
              $log.debug("UserService::update %o",user);
              if (!storage.user) {
                storage.user = {};
              }
              angular.merge(storage.user, user);
              return storage.user;
          },
          
          isAnonymous : function (user) {
            user = user || this.currentUser();
            if (this.getRoles(user).length > 0) {
              return this.hasRole ('ROLE_ANONYMOUS', user);
            }
            
            return true;
          },
          
          hasRole : function (roleType, user) {
            user = user || this.currentUser();
            
            // Grab the roles.
            var roles = this.getRoles(user);
            
            // Check for a match.
            var found = false;
            var type = roleType.toUpperCase();
            for (var i=0; i<roles.length && !found; i++) {
              found = roles[i] == type;
            }
            return found;
          },
          
          getRoles: function (user) {
            user = user || this.currentUser();
            if (user) {
              // Get the roles.
              return user.roles || [];
            }
            return [];
          },
          
          checkAccessState: function ( stateName, user ) {
            
            // We default to true.
            var access = true;
            
            if ($state && stateName && typeof stateName === 'string') {
              user = user || this.currentUser();
              
              // Grab the state.
              var theState = $state.get(stateName);
              
              // We should now check the state.
              access = this.checkAccess (theState.authRequired, user);
            }
            
            return access;
          },
          
          checkAccess: function (accessRequired, user) {
            user = user || this.currentUser();
            
            var denied = false;
            if (accessRequired === true) {
              
              // Boolean true means any none-anonymouse user.
              denied = this.isAnonymous(user); 
            } else if (typeof accessRequired === 'string') {
              
              // String type is assumed to denote a required role.
              denied = !this.hasRole( accessRequired, user );
            }
            
            return !denied;
          }
        }
        }];
      };
    }
  );
