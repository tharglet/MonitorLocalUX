'use strict';

define (
  function () {
    
    // Personal Controller for this Directive.
    var refdataLinking = function ($scope) {
      
      // Add the data and update functions here.
      $scope.data = [];
      
      $scope.refresh = function () {
        
        var funcName = $scope.property + "Values";
        
        if ( typeof $scope.object[funcName] === 'function') {
          // Grab the values...
          ($scope.object[funcName])().then(function( rdata ){
            $scope.data = rdata.data;
          });
        } 
      };
      
      // Refresh the list driving the refdata select when the object reference changes only.
      $scope.$watch("object", function(newVal, oldVal, $scope){
        $scope.refresh();
      });
    };
    
    return function () {
      
      console.log ("Adding directive");
      
      return {
        restrict: 'E',
        link: refdataLinking,
        scope: {
          "object": "=",
          "property": "@",
        },
        templateUrl: 'components/grails/directive-partials/refdata.html',
      };
    };
  }
);