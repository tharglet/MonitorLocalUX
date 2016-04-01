'use strict';

define (
  function () {
    return function (theme, $templateRequest, $compile) {
      return {
        require: 'ngModel',
        restrict: 'A',
        scope : false,
        link: function($scope, iElem, iAttr, ngModelCtrl) {
          $scope.component = ngModelCtrl;
          $templateRequest("components/kint-ui/directives/partials/" + theme + "/input-feedback.html").then(function(html){
            var template = angular.element(html);

            // Comile the template.
            $compile(template)($scope);
            
            // Append after our element.
            iElem.after(template);
            
            // Set the aria attribute for this element too!
            iElem.attr("aria-describedby", ngModelCtrl.$name);
          });
        }
      };
    };
  }
);
