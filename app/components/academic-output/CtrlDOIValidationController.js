'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('DOIValidationController', [ '$scope', '$http', function($scope, $http) {

      console.log("DOIValidationController");

      $scope.item_doi ='10.1037/0003-066X.59.1.29';
      $scope.item_container_title ='Unknown';
      $scope.item_title ='Unknown';
      $scope.item_type ='Unknown';
      $scope.valid = false;

      $scope.validate = function(){
        console.log("validate");

        var config = {};
        // $http.get('http://api.crossref.org/works/'+'10.1037/0003-066X.59.1.29', config)
        $http.get('http://api.crossref.org/works/'+$scope.item_doi, config)
          .then(function success(response) {
                  console.log("OK %o",response);
                  $scope.item_container_title = response.data.message['container-title'][0];
                  $scope.item_title = response.data.message.title[0];
                  $scope.item_type = response.data.message.type;
                  $scope.item_identifiers = response.data.message.ISSN;
                  $scope.item_authors = response.data.message.author;
                  $scope.valid = true;
                }, 
                function error(response) {
                  console.log("Error");
                });
      };

      // Validate by cross ref : issue GET to http://api.crossref.org/works/ + DOI -- eg "10.1037/0003-066X.59.1.29"

    }]);
  }
);
