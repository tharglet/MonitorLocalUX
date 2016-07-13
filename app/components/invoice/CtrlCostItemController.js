'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('CostItemController', [ '$scope', function($scope) {
      
      // Controller for CostItem.
      $scope.updateBaseCurrencyValue = function () {
        
        // Grab the rate.
        var rate = $scope.application.currency.rates[$scope.costItem.currency].rate;
        
        // Update the value of GBP
        $scope.costItem.grossValueGBP.value = parseFloat((rate * $scope.costItem.grossValue.value).toFixed($scope.costItem.grossValueGBP.decimals));
      };
    }]);
  }
);