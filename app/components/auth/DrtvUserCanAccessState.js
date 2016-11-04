'use strict';

define(function() {
  return function($compile, $animate, userService) {
    return {
      multiElement: true,
      transclude: 'element',
      priority: 601, // ng-if is 600, therefore this puts us just before that.
      terminal: true,
      restrict: 'A',
      link: function($scope, $element, $attr, ctrl, $transclude) {
        if ( userService.checkAccessState($attr.kintAccessState) ) {
          $transclude(function(obj, newScope) {
            obj[obj.length++] = $compile.$$createComment('end kintAccessState', $attr.kintAccessState);
            
            // Because we have manually transcluded the object we will need to add the element to the dom manually.
            obj.insertAfter($element);
          });
        }
        // Else we simply do nothing. This is a terminal directive and should therefore just not add the compiled contents of this element and children.
      }
    };
  };
});