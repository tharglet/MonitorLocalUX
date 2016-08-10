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
    
//    angular.merge(compliance, {
//      status : {},
//      ruleVals : {
//        'Funder acknowledgement' :  'Yes',
//        'Research materials access' : 'Yes',
//        'gold' : {
//          'Embargo' : 0,
//          'License' : 'CC BY'
//        },
//        'gold paid by other' : {
//          'Embargo' : 0,
//          'License' : 'CC BY'
//        },
//        'green' :  {
//          'Deposit' : 'At least one deposit where the version deposited is "Accepted Manuscript".'
//        }
//      }

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