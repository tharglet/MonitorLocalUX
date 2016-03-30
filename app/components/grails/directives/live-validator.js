'use strict';

define (
  function () {
    return function ($q) {
      return {
        require: 'ngModel',
        restrict: 'A',
        controller : [function() {
          
        }],
        link: function($scope, iElem, iAttr, ctrl) {

          ctrl.$asyncValidators.grailsValidate = function(modelValue, viewValue) {
            
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
              
              // If this isn't the base resource then we should grab it.
              if (typeof validator['$baseResource'] === 'function') {
                validator = validator.$baseResource();
              }
  
              if (typeof validator['$validate'] === 'function') {
                
                // Grab the property name.
                var elName = els[(els.length - 1)];
                
                // We now need to evaluate the object that the property lives against.
                var root = $scope.$eval(model.substring(0, (model.length - (elName.length + 1))));
                
                // Create parameters.
                var params = {
                  "prop": elName,
                  "domain": root['class'],
                };
                
                // Data object to post.
                var data = {};
                data[elName] = modelValue;
  
                // The messages.
                ctrl.grailsValidate = {};
  
                // Do the validation.
                validator.$validate (
                  params,
                  data,
                  function () {
                    // Valid! Just resolve the promise.
                    def.resolve();
                  },
                  function(data) {
                    // Invalid! Reject with our message.
                    def.reject(data.message);
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
