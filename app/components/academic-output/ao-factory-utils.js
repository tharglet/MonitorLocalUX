'use strict';

console.log ("Loading Utils Factory file!");
define(
    ['app'], // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
    function (app) {
      return app.registerFactory('utils', function () {
    return {
      // Utils for finding an object by its 'id' property among an array
      findById: function findById(a, id) {
    	for (var i = 0; i < a.length; i++) {
    		console.log(a[i]);
          if (a[i].ao_id == id) return a[i];
        }
        console.log('null!');
        return null;
      }
    }
      })
    }
);