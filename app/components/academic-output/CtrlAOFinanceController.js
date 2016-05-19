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
      
      $scope.addCost = function (propertyName, type) {
        
        // The resource.
        var res = $scope.context;
        
        // Only add if we can push to it.
        if (res[propertyName] && typeof res[propertyName].push === 'function' ) {
          return $scope.getBlank(propertyName).then(function ( blank ) {
            
            var typeObj = $scope.paymentTypes[type];
            
            // Add the type to the "blank"
            blank.status = typeObj;
            $scope.context[propertyName].push( blank );
          });
        }
        
        return null;
      };
      
      $scope.editCost = function(item) {
        var callingScope = this;
        
        // Need to remember the original.
        callingScope.editMultiProperty(item);
        
        callingScope.openModal('components/academic-output/partials/_modal_cost_item_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope.academicOutput.$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };      
    }]);
  }
);
