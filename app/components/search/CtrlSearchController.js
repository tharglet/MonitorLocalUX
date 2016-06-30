'use strict';

define (
  ['app'],
  function(app) {


    app.registerController('SearchController', [ '$scope', function($scope) {

      console.log("SearchController::init");
      $scope.queryParams={};

      $scope.doSearch = function() {
        console.log("SearchController::doSearch()");
        $scope.$root.$broadcast('searchCriteriaChanged', $scope.queryParams);
        // $scope.$emit('searchCriteriaChanged', {wibble:'woo'});
      }
    }]);
  }
);
