'use strict';

define (
  function () {

    return function ($compile, $templateRequest, $q) {

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
          $scope.data = [];

          // Object.
          var obj = $scope.object;

          // The refresh function
          $scope.refresh = function ( searchParam ) {

            // Check if this is refdata. We fetch all refdata.
            if ( typeof $scope.object.componentLookup === 'function') {
              // Push if through the lookup method on the resource.
              $scope.object.componentLookup ($scope.property, searchParam).then(function( rdata ){
                $scope.data = rdata.data;
              });
            }
          };

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

          $templateRequest("components/grails/directives/partials/component-lookup.html").then(function(html){
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