'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('PersonController', [ '$scope', function($scope) {

      console.log("PersonController");      
      $scope.editContactDetails = function(item) {
        if (typeof item === 'string') {
          this.editListItem ('components/person/partials/_modal_contact_details_edit.html', item, arguments[1], 'person');
        } else {
          this.editListItem ('components/person/partials/_modal_contact_details_edit.html', item, 'person');
        }
      };
    }]);
  }
);
