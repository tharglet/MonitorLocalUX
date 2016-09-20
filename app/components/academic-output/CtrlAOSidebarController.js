'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOSidebarController', ['$rootScope', '$scope', 'context', 'grailsResource', 'debounce', function ($rootScope, $scope, context, resource, debounce) {

      // Enable the sidebar.
      $rootScope.sidebar.enable();
      
      // The context will not exist in this scope. We need it for watches.
      $scope.context = context;

      // Workflow and compliance objects.
      if (!$scope.context.$$compliance) {
        $scope.context.$$compliance = {};
      }
      if (!$scope.context.$$workflow) {
        $scope.context.$$workflow = {
          'Compliance' : {
            'All compliance checks have been reviewed' : context.workflowStatus
          }
        };
      }
      $scope.workflow = $scope.context.$$workflow;
      $scope.compliance = $scope.context.$$compliance;

      // Grab the workflow status.
      var refreshWorkflowRules = debounce(function () {
        resource.checkRules({ id: 'workflow*' }, context).$promise.then(function (workflowData) {
          
          var complianceValue = $scope.workflow['Compliance'];
          
          if ("workflow" in workflowData ) {
            angular.copy(workflowData['workflow'], $scope.workflow);
          }
          
          // Add the compliance rule here to ensure that it is the last item in the list.
          $scope.workflow['Compliance'] = complianceValue;
        });
      }, 20);
      
      // Call now. If the model updates within 20 milliseconds then the method will be queued.
      refreshWorkflowRules();

      // Shallow watches. Only change if reference changes not the properties.
      $scope.$watchGroup(
        ['context.name','context.publicationRoute', 'context.publicationTitle', 'context.apcFundingApproval', 'context.publisher'], refreshWorkflowRules
      );

      // Deep watches. Watch for items added to the collection as well as properties of each items changing.
      $scope.$watch('context.identifiers', refreshWorkflowRules, true);
      $scope.$watch('context.academicOutputCosts', refreshWorkflowRules, true);
      $scope.$watch('context.funds', refreshWorkflowRules, true);
      $scope.$watch('context.names', refreshWorkflowRules, true);
      
      $scope.$watch('compliance', function(newVal) {
        
        if (!angular.equals(newVal, {})) {
          var found = false;
          for ( var k in newVal) {
            if (k.indexOf('$') !== 0 && newVal.hasOwnProperty(k)) {
              for ( var r in newVal[k]) {
                if (r.indexOf('$') !== 0 && newVal[k].hasOwnProperty(r)) {
                  found = (typeof newVal[k][r]['result'] === 'undefined' || newVal[k][r]['result'] === null);
                }
                if (found) break;
              }
            }
            if (found) break;
          }
          // We should add the compliance data here.
          $scope.workflow['Compliance']['All compliance checks have been reviewed'] = !found;
        }
      }, true);
      
      $scope.$on('$destroy', function(){
        $rootScope.sidebar.disable();
      });
      
      
      /*** Compliance ***/      
      var refreshComplianceRules = debounce(function () {
        resource.checkRules ({ id: null }, context).$promise.then(
          function (complianceData) {
            angular.copy(complianceData, $scope.compliance);
          }
        );
      }, 20);
  
      // Shallow watches. Only change if reference changes not the properties.
      $scope.$watchGroup(
        ['context.publicationRoute', 'context.embargoPeriod','context.licence', 'context.acknowledgement', 'context.accessStatement', 'context.apcFundingApproval'], refreshComplianceRules
      );
      
      // Deep watches. Watch for items added to the collection as well as properties of each items changing.
      $scope.$watch('context.deposits', refreshComplianceRules, true);
    }]);
  }
);
