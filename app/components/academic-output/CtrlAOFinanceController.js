'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOFinanceController', [ '$scope', '$filter', function($scope, $filter) {
      console.log("Finance Ctrl");
      
      // The list of payment types.
      $scope.paymentTypes = {};
      $scope.context.componentLookup ("academicOutputCosts.status").then(function( rdata ) {
        angular.forEach (rdata.data, function (item) {
          $scope.paymentTypes[item.value] = item;
        });
      });
      

      $scope.costs = {};
      var updateCostLists = function (paymentTypes) {
        paymentTypes = paymentTypes || $scope.paymentTypes;
        angular.forEach (paymentTypes, function (item, index) {
          $scope.costs[index] = $filter('filter') ($scope.context.academicOutputCosts, { 'status' : item }, true);
        });
      };
      
      // Watches!
      $scope.$watchCollection('paymentTypes', function( newValue, oldValue ) {
        if (typeof newValue !== 'undefined') {
          updateCostLists (newValue);
        }
      });
      $scope.$watchCollection('context.academicOutputCosts', function( newValue, oldValue ) {
        if (typeof newValue !== 'undefined') {
          updateCostLists ();
        }
      });
      
      $scope.editCost = function(item, type) {
        if (typeof item === 'string') {
          this.editListItem ('components/academic-output/partials/_modal_cost_item_edit.html', item, arguments[2], 'academicOutput', function(ci) {
            // Add the type to the "blank"
            ci.status = $scope.paymentTypes[type];
            ci.academicOutput = { id : $scope.context.id };
            
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
