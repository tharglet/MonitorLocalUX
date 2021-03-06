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
          contextPath:  "@",
          disabled: "<ngDisabled",
          required: "<ngRequired",
        },
        link: function ($scope, iElement, iAttr) {
          
          if (typeof $scope.disabled === 'undefined') {
            $scope.disabled = typeof iAttr['disabled'] !== 'undefined';
          }
          
          if (typeof $scope.required === 'undefined') {
            $scope.required = typeof iAttr['required'] !== 'undefined';
          }
          
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
          
          var blank = {
              id : "__new__"
          };
          if (typeof iAttr['tagging'] !== 'undefined') {
            obj.getBlankProperty ($scope.contextPath).then(function( rdata ) {
              angular.merge ( blank, rdata );
            });
          }
          
          // Method that is responsible for a blanks.
          $scope.newTagValue = function (newValue) {
            if (newValue && newValue.trim() != "") {
              return angular.merge (angular.copy(blank), { value: newValue }) ;
            } else {
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

          var addAttributes = function(attr, template) {
            angular.forEach(attr, function(val, name) {
              if (name.indexOf('$') !== 0) {
                switch ( name ) {
                  case "object":
                  case "property":
                    // ignore these.
                    break;
                  case "class":
                    // Add classes rather than setting.
                    template.addClass(val);
                    break;
  
                  case "tagging":
                     // Add the tagging method.
                    template.attr(name, 'newTagValue');
                    template.attr('tagging-label', "false");
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
            
            if ($scope.required === false) {
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
