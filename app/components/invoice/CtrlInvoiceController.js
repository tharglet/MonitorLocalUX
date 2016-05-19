'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('InvoiceController', [ '$scope', function($scope) {
   // The list of payment types.
      $scope.paymentTypes = {};
      $scope.context.componentLookup ("invoiceCosts.status").then(function( rdata ) {
        angular.forEach (rdata.data, function (item) {
          $scope.paymentTypes[item.value] = item;
        });
      });
      
      $scope.addCost = function (propertyName) {
        
        // The resource.
        var res = $scope.context;
        
        // Only add if we can push to it.
        if (res[propertyName] && typeof res[propertyName].push === 'function' ) {
          return $scope.getBlank(propertyName).then(function ( blank ) {
            // Add the type to the "blank"
            blank.status = $scope.paymentTypes['Actual'];
            $scope.context[propertyName].push( blank );
          });
        }
        
        return null;
      };
      
      $scope.editCost = function(item) {
        var callingScope = this;
        
        // Need to remember the original.
        callingScope.editMultiProperty(item);
        
        callingScope.openModal('components/invoice/partials/_modal_cost_item_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
          // Dirty the owning form too!
          callingScope.invoice.$setDirty();
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
    }]);
  }
);
