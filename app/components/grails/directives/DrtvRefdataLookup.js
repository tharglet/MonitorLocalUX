'use strict';

define (
  function () {

    return function ($compile, $templateRequest) {

      console.log ("Adding directive");

      return {
        restrict: 'E',
        scope: {
          object:   "=",
          property: "@",
          template: "@",
        },
        link: function ($scope, iElement, iAttr) {

          var iElem  = iElement;

          // Add the data and update functions here.
          if (typeof $scope.data === "undefined") {
            $scope.data = [];
          }

          // The refresh function
          $scope.refresh = function ( searchParam ) {

            // Refdata function name.
            var funcName = $scope.property + "Values";
            // Check if this is refdata. We fetch all refdata.
            if ( $scope.object && typeof $scope.object[funcName] === 'function' ) {
              // Grab the values...
              ($scope.object[funcName])().then(function( rdata ){
                $scope.data = rdata.data;
              });
            }
          };

          // Register a watch function to update when the module changes.
          $scope.rdw = $scope.$watch("object", function(newVal, oldVal){
            if (!angular.equals({}, newVal)) {
              $scope.refresh();
              
              // Clear the watch until next load.
              $scope.rdw();
            }
          });

          var addAttributes = function(atrrs, template) {
            angular.forEach(iAttr, function(val, name) {
              if (!name.startsWith('$')) {
                switch ( name ) {
                case "object":
                case "property":
                  // ignore these 2.
                  break;
                case "class":
                  // Add classes rather than setting.
                  template.addClass(val);
                  break;
                default:
                  // Copy the value over.
                  template.attr(name, val);
                }
              }
            });
          };

          $templateRequest("components/grails/directives/partials/refdata-lookup.html").then(function(html){
            var template = angular.element(html);

            // Grab each element.
            addAttributes(iAttr, template);

            // Comile the template now.
            $compile(template)($scope);

            // Replace
            iElem.replaceWith(template);
          });
        },
      };
    }
  }
);