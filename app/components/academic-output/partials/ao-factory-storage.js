'use strict';

console.log ("Loading AO Storage Factory file!");
define(
    ['app'], // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
    function (app) {
      return app.registerFactory('AOStorage', function() {
        console.log ("Initialising AO Storage Factory!");
        var path = '../mockups/ao_item.json';
        var academic;
        
        var factory = {
        	async: function(){
        		//we load data only once 
        		if(!academic){
        		    var academic = $http.get(path).then(function (response) {
        	    		console.log('here is your data :)');
        	    		console.log(response.data.list)
        	    		return response.data.list;
        	      }, function (response) {
        	        console.log('something goes wrong!');
        	        console.log(response);
        	      });
        		}
        		return academic;
        	}
        };
        return factory;
      });
    }
);