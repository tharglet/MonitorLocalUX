'use strict';

define(
    ['app'], // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
    function (app) {
      return app.registerFactory('utils', function () {
    return {
      // Utils for finding an object by its 'id' property among an array
      findById: function findById(a, id) {
    	for (var i = 0; i < a.length; i++) {
          if (a[i].ao_id == id) return a[i];
        }
        return null;
      }
    }
      })
    }
);