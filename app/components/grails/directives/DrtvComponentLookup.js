'use strict';

define (
  function () {
    return function ($compile, $templateRequest, $parse) {
      return {
        restrict: 'E',
        scope: {
          
          // Objects against which we are to bind the data.
          object:       "=",
          property:     "@",
          
          // These allow for overrides on the object against which the query happens.
          contextObj:   "&",
          contextPath:  "@",
          
          // Allow for a different template 
          template:     "@",
          
          // Query params.
          params:       "@"
          
        },
        link: function ($scope, iElement, iAttr) {
          
          var multiple = typeof iAttr['multiple'] !== 'undefined'; 
          
          // Grab the object.
          var obj = $scope.contextObj();
          if ( typeof obj === 'undefined' ) {
            obj = $scope.object;
          }
          
          if (typeof $scope.contextPath === 'undefined') {
            $scope.contextPath = $scope.property;
          }
          
          var lookupMethod;
          if (typeof iAttr['lookupMethod'] === 'undefined') {
            lookupMethod = obj.componentLookup;
          } else {
            // Parse the lookup method.
            lookupMethod = $parse(iAttr['lookupMethod'])($scope);
          }

          var iElem  = iElement;

          // Add the data and update functions here.
          $scope.data = [];
          
          // Params to be sent to the lookup.
          var params = $parse(iAttr['params'])($scope) || {};

          // The refresh function
          $scope.refresh = function ( searchParam ) {

            // Check if this is refdata. We fetch all refdata.
            if ( obj && $scope.contextPath && typeof lookupMethod === 'function') {
              // Push if through the lookup method on the resource.
              lookupMethod ($scope.contextPath, searchParam, params).then(function( rdata ){
                $scope.data = rdata.data;
              });
            }
          };
          
          $scope.checkUndefined = function (item, model) {
            if (typeof item === 'undefined') {
              $scope.object[$scope.property] = null;
            }
          };

          var addAttributes = function(atrrs, template) {
            angular.forEach(iAttr, function(val, name) {
              if (!name.indexOf('$') === 0) {
                switch ( name ) {
                case "object":
                case "property":
                case "multiple":
                  // ignore these.
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

          $templateRequest("components/grails/directives/partials/component-lookup" + (multiple ? "-multi" : "") + ".html").then(function(html){
            var template = angular.element(html);
            
            if (typeof iAttr.required === 'undefined') {
              $('ui-select-match', template).attr("allow-clear", "true");
            }

            // Grab each element.
            addAttributes(iAttr, template);

            // Compile the template now.
            $compile(template)($scope);

            // Replace
            iElem.replaceWith(template);
          });
        },
      };
    }
  }
);