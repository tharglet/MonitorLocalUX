'use strict';

define(
    ['app'], // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
    function (app) {
      return app.registerFactory('AOStorage',['$http', function($http) {
        var path = '../mockups/ao_item.json';
        var academic;
        var factory = {
        	async: function(){
        		//we load data only once 
        		if(!academic){
        		    var academic = $http.get(path).then(function (response) {
        	    		return response.data.list;
        	      }, function (response) {
        	        console.log('something goes wrong!');
        	      });
        		}
        		return academic;
        	}
        };
        return factory;
      }]);
    }
);