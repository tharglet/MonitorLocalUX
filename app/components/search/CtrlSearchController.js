'use strict';

define (
  ['app'],
  function(app) {


    app.registerController('SearchController', [ '$scope', function($scope) {

      console.log("SearchController::init");

      $scope.wibble = "hello";

      $scope.doSearch = function() {
        console.log("SearchController::doSearch()");
        $scope.$root.$broadcast('searchCriteriaChanged', {wibble:'woo'});
        // $scope.$emit('searchCriteriaChanged', {wibble:'woo'});
      }
    }]);
  }
);
