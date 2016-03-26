'use strict';

define (
  function () {
    
    return function ($compile, $templateRequest) {
      
      console.log ("Adding directive");
      
      return {
        restrict: 'E',
        scope: {
          object:   "=",
          property: "@"
        },
        compile: function compile(tElem, tAttr, transclude) {
          
          // The linknig function. Needs to be declared here to have access to the template
          // request service.
          return function ($scope, iElem, iAttr) {
            
            // Add the data and update functions here.
            $scope.data = [];
            
            // The refresh function
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

            
            $templateRequest("components/grails/directives/partials/refdata.html").then(function(html){
              var template = angular.element(html);
              
              // Grab each element.
              angular.forEach(tAttr, function(val, name) {
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
              $compile(template)($scope);
              
              // Replace
              iElem.replaceWith(template);
            });
          };
        },
      };
    };
  }
);