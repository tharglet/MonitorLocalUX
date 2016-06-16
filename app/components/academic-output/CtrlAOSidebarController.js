'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOSidebarController', [ '$scope', 'context', 'grailsResource', 'debounce', function ($scope, context, resource, debounce) {
      
      // The context will not be in this scope.
      $scope.context = context;
      
      // Use the contextual resource and check the rules for workflow.
      $scope.workflow = {};
      var workflowGrouping = {
          'General' : [
            'Add a Title',
            'Attach a grant',
            'Set the publication route',
            'Set APC Funding Approval'
          ],
          'People' : [
            'Add a main contact'
          ],
          'Publication' : [
            'Add an identifier',
            'Add a Publication Title',
            'Add an ISSN or eISSN'
          ],
          'Finance' : [
            'Add a cost item for the actual expenditure'
          ]
      };
      
      // Grab the workflow status.
      var refreshRules = debounce(function () { 
        resource.checkRules({ id: 'workflow' }, context).$promise.then(function (workflowData) {
          var wf = $scope.workflow;
          angular.forEach(workflowGrouping, function (rules, group) {
            if ( typeof wf[group] == 'undefined' ) {
              wf[group] = {};
            }
  
            angular.forEach(rules, function (rule) {
              wf[group][rule] = workflowData[rule];
            });
          });
          
          angular.merge ( workflowData, $scope.workflow );
        });
      }, 500);
      
      $scope.$watchGroup(
        ['context.name','context.publicationRoute', 'context.apcFundingApproval'], refreshRules
      );
      $scope.$watchCollection('context.identifiers', refreshRules);
      $scope.$watchCollection('context.academicOutputCosts', refreshRules);
    }]);
  }
);