'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('AOComplianceController', [ '$scope', 'context', 'grailsResource', 'debounce', function ($scope, context, resource, debounce) {

      // Required vals. These should come from the server, and also be used within the rules themselves.
      $scope.ruleVals = {
        '_all' : {
          'Funder acknowledgement' :  'Yes',
          'Research materials access' : 'Yes',
        },
        'gold' : {
          'Embargo' : 0,
          'License' :  'CC BY'
        },
        'gold paid by other' : {
          'Embargo' : 0,
          'License' :  'CC BY'
        },
        'green' :  {
          'Deposit' : 'At least one deposit where the version deposited is "Accepted Manuscript".'
        }
      };

      // Use the contextual resource and check the rules for compliance.
      $scope.compliance = {
        'Funder acknowledgement' :  null,
      };

      // Grab the compliance type.
      var complianceType = "rcuk";

      // Use a debounced method to grab the compliance status. This prevents multiple firing of the same method.
      var refreshRules = debounce(function () {
        resource.checkRules({ id: 'compliance-'  + complianceType}, context).$promise.then(function (complianceData) {
          angular.copy ( complianceData, $scope.compliance );
        });
      }, 500);

      // Shallow watches. Only change if reference changes not the properties.
      $scope.$watchGroup(
        ['context.publicationRoute', 'context.embargoPeriod','context.licence', 'context.acknowledgement', 'context.accessStatement'], refreshRules
      );

      // Deep watches. Watch for items added to the collection as well as properties of each items changing.
      $scope.$watch('context.deposits', refreshRules, true);
//      $scope.$watch('context.academicOutputCosts', refreshRules, true);
//      $scope.$watch('context.funds', refreshRules, true);
    }]);
  }
);
