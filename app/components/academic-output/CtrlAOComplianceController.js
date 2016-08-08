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
     angular.merge($scope.context.$$compliance, {
       status : {},
       ruleVals : {
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
       }
     });
     
     $scope.compliance = $scope.context.$$compliance.status;
     // Required vals. These should come from the server, and also be used within the rules themselves.
     $scope.ruleVals = $scope.context.$$compliance.ruleVals;

      // Use the contextual resource and check the rules for compliance.
      angular.merge($scope.compliance, {
        'Funder acknowledgement' :  null,
      });

      // Grab the compliance type.
      var complianceType = "rcuk";

      // Use a debounced method to grab the compliance status. This prevents multiple firing of the same method.
      var refreshRules = debounce(function () {
        resource.checkRules({ id: 'compliance-'  + complianceType}, context).$promise.then(function (complianceData) {
                      
          // Create a list of only the applicable rules..
          var applicable_rules = angular.merge(
            {},
            $scope.ruleVals['_all']
          );
          if ($scope.context.publicationRoute) {
            angular.merge(
              applicable_rules,
              $scope.ruleVals[$scope.context.publicationRoute.value.toLowerCase()]
            );
          }

          for ( var k in complianceData) {
            if (k in applicable_rules) {
              $scope.compliance[k] = complianceData[k];
            }
          }
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
