'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('InvoiceController', [ '$scope', function($scope) {

      console.log("InvoiceController");
      
      $scope.editCost = function(item) {
        console.log("Cost edit");
        var callingScope = this;
        
        // Need to remember the original.
        callingScope.editMultiProperty(item);
        
        callingScope.openModal('components/invoice/partials/_modal_cost_item_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
    }]);
  }
);
