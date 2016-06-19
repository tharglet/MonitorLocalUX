'use strict';

define (
  function () {
    return function (theme, $templateRequest, $compile) {
      return {
        require: 'ngModel',
        restrict: 'A',
        scope : false,
        link: function($scope, iElem, iAttr, ngModelCtrl) {
          $templateRequest("components/kint-ui/directives/partials/" + theme + "/input-feedback.html").then(function(html) {
            
            var template = angular.element(html);

            // We create an new scope here for the template. We do this here programatically,
            // so that this directive can be used simultaneously with other directives that create isolated scopes.
            var privateScope = $scope.$new(false, $scope);
            privateScope.component = ngModelCtrl;
            $compile(template)(privateScope);
            
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
