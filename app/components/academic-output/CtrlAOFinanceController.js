'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOFinanceController', [ '$scope', '$filter', function($scope, $filter) {
      
      // The categories to total.
      var totalCats = ['grossValue', 'grossValueGBP', 'tax', 'net'];
      
      // The list of payment types.
      $scope.paymentTypes = {};
      $scope.context.componentLookup ("academicOutputCosts.status").then(function( rdata ) {
        angular.forEach (rdata.data, function (item) {
          $scope.paymentTypes[item.value] = item;
        });
      });

      $scope.costs = {};
      $scope.totals = {};
      var updateCostLists = function (paymentTypes) {
        paymentTypes = paymentTypes || $scope.paymentTypes;
        angular.forEach (paymentTypes, function (item, index) {
          
          // First filter the list.
          var items = $filter('filter') ($scope.context.academicOutputCosts, { 'status' : item }, true);
          
          // Calculate the net and increment all the totals..
          $scope.totals[index] = {};
          angular.forEach (items, function (row, rowIndex) {
            row.net = { value: row.grossValueGBP.value - row.tax.value };

            // Totals
            angular.forEach (totalCats, function (cat) {
              
              var val = row[cat].value;
              if (row.category && row.category.value == 'Refund') {
                val = -val;
              }
              
              if (rowIndex ===- 0) {
                // Set rather than increment.
                $scope.totals[index][cat] = val;
              } else {
                // increment.
                $scope.totals[index][cat] += val;
              }
            });
          });
          
          // Set the items after calculating.
          $scope.costs[index] = items;
        });
      };
      
      // Watches!
      $scope.$watchCollection('paymentTypes', function( newValue, oldValue ) {
        if (typeof newValue !== 'undefined') {
          updateCostLists (newValue);
        }
      });
      $scope.$watch('context.academicOutputCosts', function( newValue, oldValue ) {
        if (typeof newValue !== 'undefined') {
          updateCostLists ();
        }
      }, true);
      
      $scope.editCost = function(item, type) {
        if (typeof item === 'string') {
          this.editListItem ('components/academic-output/partials/_modal_cost_item_edit.html', item, arguments[2], 'academicOutput', function(ci) {
            // Add the type to the "blank"
            ci.status = $scope.paymentTypes[type];
            
            return ci;
          });
        } else {
          this.editListItem ('components/academic-output/partials/_modal_cost_item_edit.html', item, 'academicOutput');
        }
      };
      
      $scope.actualizeCost = function (item) {
        item.status = $scope.paymentTypes['Actual'];
        updateCostLists ();
        $scope.academicOutput.$setDirty();
      }
    }]);
  }
);
