'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOSidebarController', [ '$scope', 'context', 'grailsResource', 'debounce', function ($scope, context, resource, debounce) {

      // The context will not exist in this scope. We need it for watches.
      $scope.context = context;

      // Use the contextual resource and check the rules for workflow.
      $scope.workflow = {};
      var workflowGrouping = {
          'General' : [
            'Add a title',
            'Set the publication route',
            'Set APC funding approval',
            'Attach a grant'
          ],
          'People' : [
            'Add a main contact'
          ],
          'Publication' : [
            'Add an identifier (DOI/PMID/PMCID)',
            'Add a journal/conference title',
            'Add a publisher'
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
    }]);
  }
);
