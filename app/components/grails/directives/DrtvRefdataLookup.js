'use strict';

define (
  function () {

    return function ($compile, $templateRequest) {

      return {
        restrict: 'E',
        scope: {
          
          // Objects against which we are to bind the data.
          object:       "=",
          property:     "@",
          
          // These allow for overrides on the object against which the query happens.
          contextObj:   "&",
          contextPath:  "@"
        },
        link: function ($scope, iElement, iAttr) {
          
          // Grab the object.
          var obj = $scope.contextObj();
          if ( typeof obj === 'undefined' ) {
            obj = $scope.object;
          }
          
          if (typeof $scope.contextPath === 'undefined') {
            $scope.contextPath = $scope.property;
          }

          var iElem  = iElement;

          // Add the data and update functions here.
          if (typeof $scope.data === "undefined") {
            $scope.data = [];
          }

          // The refresh function
          $scope.refresh = function ( searchParam ) {
            // Now that we can have . notated propertie we should use geenric method.
            obj.componentLookup ($scope.contextPath, searchParam, {match:'value'}).then(function( rdata ){
              $scope.data = rdata.data;
            });
          };
          
          $scope.checkUndefined = function (item, model) {
            if (item === undefined) {
              $scope.object[$scope.property] = null;
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
              if (!name.indexOf('$') === 0) {
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

          var tmp = "components/grails/directives/partials/refdata-lookup.html";
          if (typeof iAttr['template'] === 'string') {
            tmp = iAttr['template'];
          }
          $templateRequest(tmp).then(function(html){

            var template = angular.element(html);
            
            if (typeof iAttr.required === 'undefined') {
              $('ui-select-match', template).attr("allow-clear", "true");
            }

            // Grab each element.
            addAttributes(iAttr, template);

            // Comile the template now.
            $compile(template)($scope);

            // Replace
            iElem.replaceWith(template);
          });
        }
      };
    };
  }
);
