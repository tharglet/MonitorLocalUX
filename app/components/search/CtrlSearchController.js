'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('SearchController', [ '$scope', 'grailsResource', function($scope, resource) {

      $scope.doSearch = function() {
        console.log("SearchController::doSearch()");
        $scope.$root.$broadcast('searchCriteriaChanged', $scope.queryParams);
        // $scope.$emit('searchCriteriaChanged', {wibble:'woo'});
      };
      
      // Add the search button and "enter" key function and other listeners.
      var alterFields = function(items) {
        angular.forEach (items, function(field, index) {
          if (index === 0) {
            angular.merge(field.templateOptions, {
              addonRight: {
                "text": "",
                "class": "glyphicon glyphicon-search",
                "onClick": $scope.doSearch
              },
              onKeypress: function(model, options, el, event) {
                if (event.which === 13) {
                  // Enter pressed, do the search.
                  $scope.doSearch();
                }
              }
            });
          } else {
            // All other fields happen on change.
            angular.merge(field.templateOptions, {
              onChange: $scope.doSearch
            });
          }
        });
        
        return items;
      };
      
      // Fetch the search config for this resource type.
      resource.searchConfig(function(response){
        console.log("Found the config...");
        angular.copy(alterFields(response.formly), $scope.searchFields);
      });

      console.log("SearchController::init");
      $scope.queryParams={};
      $scope.searchFields=[];
    }]);
  }
);
