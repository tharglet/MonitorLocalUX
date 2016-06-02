'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('CostItemController', [ '$scope', '$filter', function($scope, $filter) {
      
      console.log("Cost Item Controller");
      
      // Controller for CostItem.
      $scope.updateBaseCurrencyValue = function () {
        
        // Grab the rate.
        var rate = $scope.application.settings.currency.rates[$scope.costItem.currency].rate;
        
        // Update the value of GBP
        $scope.costItem.grossValueGBP.value = parseFloat( $filter('number')( (rate * $scope.costItem.grossValue.value), $scope.costItem.grossValueGBP.decimals));
      };
    }]);
  }
);