'use strict';

console.log ("Loading AO Award Directive file!");
define(
  [
   'app',                   // We use the main module "app" to register all controllers/factories or services that we load on-the-fly.
   './ao-factory-storage'   // We also need the aofactory javascript module as that contains the AOStorage angular factory. The "." in the include signifies relative path!
  ],
  function (app) {

    app.registerDirective('awardRecord', ['AOStorage', function(AOStorage) {
      console.log ("Initialising AO Award Directive!");
      return {
        restrict: 'E',
        scope:{
          globalitem : '=item',
          key : '=key'
        },
        templateUrl: 'components/academic-output/partials/award-record-directive.html',
        link: function(scope, element, attrs){
          element.find('.remove').bind('click', function(){
            AOStorage.deleteAward(scope.key);
          });               
        }
      };
    }]);
    
  }
);