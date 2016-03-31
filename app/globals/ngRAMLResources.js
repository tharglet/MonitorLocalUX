'use strict';

(function(window, angular){
  
  function RAMLResource (resource) {
    
    // Register the RAML parser here.
    var raml = window.Q;
    if (typeof this.raml === 'undefined' && typeof window.require === 'function') {
      raml = require ("raml-parser");
    }
    window.RAML = raml;
    var raml_url;
    var raml_data = {};
    
    return { 
      configWith : function( url ) {
        
        // Return a resolved promise.
        if (url === raml_url) {
          return $q.defer().resolve();
        }
        
        // Make a request to the remote API and include the apiToken
        console.log ("Attempting to access " + url);
        
        return raml.loadFile( url ).then(function(data){
          raml_url = url;
          raml_data = data;
        });
      },
    
      getData : function () {
        return raml_data;
      }
    };
  }
  
  return angular.module('ngRAMLResources', ['ngResource'])
  .service('$RAMLResource', ["$resource", RAMLResource]);
})(window, window.angular);