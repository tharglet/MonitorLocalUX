'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('InvoiceController', [ '$scope', function($scope) {
      
      // The categories to total.
      var totalCats = ['grossValue', 'grossValueGBP', 'tax', 'net'];
      
      // The list of payment types.
      $scope.paymentTypes = {};
      $scope.context.componentLookup ("invoiceCosts.status").then(function( rdata ) {
        angular.forEach (rdata.data, function (item) {
          $scope.paymentTypes[item.value] = item;
        });
      });
      
      $scope.editCost = function(item) {
        if (typeof item === 'string') {
          this.editListItem ('components/invoice/partials/_modal_cost_item_edit.html', item, arguments[1], 'invoice', function(ci) {
            // Add the type to the "blank"
            ci.status = $scope.paymentTypes['Actual'];
            
            return ci;
          }, 'CostItemController');
        } else {
          this.editListItem ('components/invoice/partials/_modal_cost_item_edit.html', item, 'invoice', 'CostItemController');
        }
      };
      
      $scope.totals = {};
      var updateTotals = function () {
        
        // Just need to update the invoice totals.
        angular.forEach ($scope.context.invoiceCosts, function (row, rowIndex) {
          
          // NET value.
          row.net = { value: row.grossValueGBP.value - row.tax.value };

          // Totals
          angular.forEach (totalCats, function (cat) {
            
            var val = row[cat].value;
            if (row.category && row.category.value == 'Refund') {
              val = -val;
            }
            
            if (rowIndex ===- 0) {
              // Set rather than increment.
              $scope.totals[cat] = val;
            } else {
              // increment.
              $scope.totals[cat] += val;
            }
          });
        });
      };
      

      // Watch the collection, so we can update the totals.
      $scope.$watch('context.invoiceCosts', function( newValue, oldValue ) {
        if (typeof newValue !== 'undefined') {
          updateTotals();
        }
      }, true);
    }]);
  }
);
