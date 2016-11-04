'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('ctrlProfile', [ '$scope', '$http', 'grailsResource', 'appConfig', function($scope, $http, grailsResource, appConfig) {
      
      $scope.context = grailsResource.staticInst();

      console.log("ProfileController");
      console.log("User:%o",$scope.application.user);

      $scope.requestAffiliation = function() {
        console.log("requestAffiliation");
        console.log("App config %o %o",appConfig,$scope.affiliationRequestData);
        return $http.post(appConfig.backend+'/application/requestAffiliation', {details:$scope.affiliationRequestData}).
            then(function(response) {
              console.log("Requested affiliation %o",response);
              // return response.data;
            });

      }

      $scope.affiliationRequestData = {
      }

    }]);
  }
);
