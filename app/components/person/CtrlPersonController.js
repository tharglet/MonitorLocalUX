'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('PersonController', [ '$scope', function($scope) {

      console.log("PersonController");

      $scope.editContactDetails = function(item) {
        console.log("Contact Details");
        var callingScope = this;
        callingScope.openModal('components/person/partials/_modal_contact_details_edit.html').result.then(function () {
          callingScope.confirmEditMultiProperty(item);
        },function (){
          callingScope.cancelEditMultiProperty(item);
        });
      };
    }]);
  }
);
