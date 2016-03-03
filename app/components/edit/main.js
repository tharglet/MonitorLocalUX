'use strict';
define(
  "edit",
  ['angular-ui-router', 'deep-diff'],
  function () {

    // We require the improved angular ui-router.
    return angular.module('edit', ['ui.router', 'deep-diff'])
      .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('app.edit', {
          abstract: true,
          views: {
            "": {
              templateUrl:  'components/edit/partials/main.html',
            }
          },
          data : {
            subTitle: "Edit",
            requirelogin:true,
          },
        });
      }])
    ;
  }
);
