'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOComplianceController', [ '$scope', 'context', 'grailsResource', 'debounce', function ($scope, context, resource, debounce) {
        
      // Let's store this against the context object we also need a view of the compliance data,
      // which might not be available yet.
      if (typeof $scope.context.$$compliance === 'undefined') {
        $scope.context.$$compliance = {};
      }
      
      // Scope value.
      $scope.compliance = $scope.context.$$compliance;
      
      var refreshRules = debounce(function () {
        resource.checkRules ({ id: null }, context).$promise.then(
          function (complianceData) {
            angular.copy(complianceData, $scope.compliance);
          }
        );
      }, 20);
  
      // Shallow watches. Only change if reference changes not the properties.
      $scope.$watchGroup(
        ['context.publicationRoute', 'context.embargoPeriod','context.licence', 'context.acknowledgement', 'context.accessStatement'], refreshRules
      );
      
      // Deep watches. Watch for items added to the collection as well as properties of each items changing.
      $scope.$watch('context.deposits', refreshRules, true);
    }]);
  }
);