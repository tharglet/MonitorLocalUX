'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOSidebarController', ['$rootScope', '$scope', 'context', 'grailsResource', 'debounce', function ($rootScope, $scope, context, resource, debounce) {

      // Enable the sidebar.
      $rootScope.sidebar.enable();
      
      // The context will not exist in this scope. We need it for watches.
      $scope.context = context;
      
      // Let's store this against the context object we also need a view of the compliance data,
      // which might not be available yet.
      if (typeof $scope.context.$$compliance === 'undefined') {
        $scope.context.$$compliance = {status : {}};
      }
      if (typeof $scope.context.$$workflow === 'undefined') {
        $scope.context.$$workflow = {};
      }

      // Use the contextual resource and check the rules for workflow.
      $scope.workflow = $scope.context.$$workflow;

      // Grab the workflow status.
      var refreshRules = debounce(function () {
        resource.checkRules({ id: 'workflow*' }, context).$promise.then(function (workflowData) {
          if ("workflow" in workflowData ) {
            var wf = $scope.workflow;
            angular.copy(workflowData['workflow'], wf);
          }
        });
      }, 500);

      // Shallow watches. Only change if reference changes not the properties.
      $scope.$watchGroup(
        ['context.name','context.publicationRoute', 'context.publicationTitle', 'context.apcFundingApproval', 'context.publisher'], refreshRules
      );

      // Deep watches. Watch for items added to the collection as well as properties of each items changing.
      $scope.$watch('context.identifiers', refreshRules, true);
      $scope.$watch('context.academicOutputCosts', refreshRules, true);
      $scope.$watch('context.funds', refreshRules, true);
      $scope.$watch('context.names', refreshRules, true);
      
      $scope.$watch('context.$$compliance.status', function(newVal) {
        if ($scope.workflow['Compliance']) {
          var found = false;
          for ( var k in newVal) {
            if (newVal.hasOwnProperty(k)) {
              found = (newVal[k] === null);
            }
            if (found) break;
          }
          
          // We should add the compliance data here.
          $scope.workflow['Compliance']['No compliance checks require review'] = !found;
        }
      }, true);
      
      $scope.$on('$destroy', function(){
        $rootScope.sidebar.disable();
      });
    }]);
  }
);
