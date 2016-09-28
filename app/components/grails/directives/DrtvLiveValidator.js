'use strict';

define (
  function () {
    return function ($q) {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function($scope, iElem, iAttr, ctrl) {

          ctrl.$asyncValidators.kintValidate = function(modelValue, viewValue) {
            
            // Let's create a new deferred object.
            var def = $q.defer();
            
            // Only run if the model is not pristine.
            if (ctrl.$pristine != true) {
              
              // Grab the model property.
              var model = iAttr['ngModel'];
              
              // Go through each element.
              var els = model.split(".");
              
              // Get the root object.
              var validator = $scope[els[0]];
  
              if (typeof validator['validateProperty'] === 'function') {
                
                // Grab the property name.
                var elName = els[(els.length - 1)];
                
                // We now need to evaluate the object that the property lives against.
                var root = $scope.$eval(model.substring(0, (model.length - (elName.length + 1))));
                
                // Data object to post.
                var data = {};
                
                if (root['id']) {
                  data['id'] = root['id'];
                }
                
                data[elName] = modelValue;
  
                // Do the validation.
                validator.validateProperty (
                  elName,
                  data
                ).then(
                  function () {
                    // Valid! Just resolve the promise.
                    return def.resolve();
                  },
                  function(response) {
                    // Invalid! Reject with our message.
                    ctrl.kintValidate = response.data;
                    return def.reject(response.data);
                  }
                );
                
                return def.promise;
              }
            }

            // Default is to resolve this promise and return it.
            def.resolve();
            return def.promise;
          };
        }
      };
    };
  }
);
