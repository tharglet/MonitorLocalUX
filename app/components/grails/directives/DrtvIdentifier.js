'use strict';

define (
  function () {
    
    var addAttributes = function(attrs, template) {
      angular.forEach(attrs, function(val, name) {
        if (name.indexOf('$') !== 0) {
          switch ( name ) {
            case "identifier":
            case "property":
              // ignore these 2.
              break;
            case "class":
              // Add classes rather than setting.
              template.addClass(val);
              break;
            default:
              // Copy the value over, unless it already exists.
              if (!template.attr(name)) {
                template.attr(name, val);
              }
          }
        }
      });
    };

    return function ($compile, $templateRequest, $parse, $filter) {

      return {
        restrict: 'E',
        require: 'ngModel',
        link: function ($scope, iElem, iAttr, ngModelCtrl) {
          var ns = "";
          if (!iAttr['namespace'] || (ns = iAttr['namespace'].trim().toLowerCase()).length < 1) {
            throw "Namespace not supplied for identifier.";
          }
          
          // Grab the property.
          var prop = "";
          if (!iAttr['property'] || (prop = iAttr['property'].trim().toLowerCase()).length < 1) {
            throw "Property not supplied for blank fetching from the context.";
          }
          
          // The model object. Parse and eval it in the current scope.
          var target = $parse(iAttr['ngModel'])($scope);
          
          // Create a filtered view for our new element.
          var idList = ($filter('filter')(target, { identifier : { namespace : { value: ( ns ) } } }, false));

          var idEntry = {};
          
          $scope.$watchCollection(iAttr['ngModel'], function(){
            // Refresh the collection.
            idList = ($filter('filter')(target, { identifier : { namespace : { value: ( ns ) } } }, false));
            if (idList.length > 0) {
              
              // Copy the entry...
              angular.copy (idList[0], idEntry);
            }
          });
          
          // If there isn't an entry then we should create one.
          if (idList.length < 1) {
            
            // Create a blank one.
            $scope.getBlank(prop).then(function (data) {
              // Set the namespace and add to the list.
              data.identifier.namespace.value = ns;
              
              // Also directly set our entry here.
              angular.copy (data, idEntry);
            });
          } else {
            idEntry = idList[0];
          }
          
          // Now we grab the template.
          $templateRequest("components/grails/directives/partials/identifier.html").then(function(html){

            var template = angular.element(html);

            // Grab each element.
            addAttributes(iAttr, template);
            
            var privateScope = $scope.$new(true);
            // Add the ngModel.
            privateScope.ngModel = idEntry;
            
            // Add the bucket for tracking too.
            privateScope.target = target;

            // Replace first!
            iElem.replaceWith(template);

            // Compile the template now.
            $compile(template)(privateScope);
            
            // We need to watch the model and add/remove the value from the
            // bucket when the ID is changed from and to null. This will prevent
            // an ID structure with null value being added to the model, which would fail
            // validation.
            privateScope.$watch('ngModel.identifier.value', function (newValue, oldValue) {
              
              var $scope = privateScope;
              
              if (!oldValue && newValue) {
                // Null or empty -> value. Add the model to the bucket.
                $scope.target.push($scope.ngModel);
                
              } else if (!newValue && oldValue) {
                // value -> null or empty. Remove the entry from the bucket.
                var index = $scope.target.indexOf($scope.ngModel);
                $scope.target.splice(index, 1);
              }
            });
          });
        },
      };
    };
  }
);
