// Make sure to include the `ui.router` module as a dependency
angular.module('uiMonitorLocal', [
    'uiMonitorLocal.academic.service',
    'uiMonitorLocal.academic.controllers',
    'uiMonitorLocal.utils.service',
    'uiMonitorLocal.dashboard.controllers',
    'ui.router',
  ])

  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('academic.list') }"> will set the <li>
        // to active whenever 'academic.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )

  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////

        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider
          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
          .otherwise('/app/home');


        //////////////////////////
        // State Configurations //
        //////////////////////////

        // Use $stateProvider to configure your states.
        $stateProvider

          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/shared/template/template.view.html',
          })

        //////////
        // Home //
        //////////

          .state("home", {
            parent: 'app',
            // Use a url of "/" to set a state as the "index".
            url: "/home",
            // Example of an inline template string. By default, templates
            // will populate the ui-view within the parent state's template.
            // For top level states, like this one, the parent template is
            // the index.html file. So this template will be inserted into the
            // ui-view within index.html.
            views: {

              // This is targeting the unnamed ui-view within the parent state 'academicData.detail'
              // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
              // We could instead just set templateUrl and controller outside of the view obj.
              '': {
                templateUrl: 'app/components/dashboard/dashboard.view.html',
                controller: 'DashboardCtrl',
              }
            }
          })

          ///////////
          // About //
          ///////////

          .state('about', {
            parent : 'app',
            url: '/about',
            views: {

              // This is targeting the unnamed ui-view within the parent state 'academicData.detail'
              // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
              // We could instead just set templateUrl and controller outside of the view obj.
              '': {
                templateUrl: '/app/components/about/about.view.html'
              }
            }
          })

          .state('academic', {
            parent: 'app',
            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            abstract: true,

            // This abstract state will prepend '/academic' onto the urls of all its children.
            url: '/academic',

            // Example of loading a template from a file. This is also a top level state,
            // so this template file will be loaded and then inserted into the ui-view
            // within index.html.
            views: {

              // This is targeting the unnamed ui-view within the parent state 'academicData.detail'
              // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
              // We could instead just set templateUrl and controller outside of the view obj.
              '': {
                templateUrl: 'app/components/academic-output/academic.view.html',
              // Use `resolve` to resolve any asynchronous controller dependencies
              // *before* the controller is instantiated. In this case, since academic
              // returns a promise, the controller will wait until academic.all() is
              // resolved before instantiation. Non-promise return values are considered
              // to be resolved immediately.
              resolve: {
                academic: ['academic',
                  function( academic){
                    return academic.all();
                  }]
              },
              controller: 'academicListCtrl'
              },
            },

            // You can pair a controller to your template. There *must* be a template to pair with.
          })

          /////////////////////
          // academic > List //
          /////////////////////

          // Using a '.' within a state name declares a child within a parent.
          // So you have a new state 'list' within the parent 'academic' state.
          .state('academic.list', {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/academic' (because '/academic' + '').
            url: '',
            title: 'Academic output list',
            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within academic.html. This is the
            // most important thing to remember about templates.
            templateUrl: 'app/components/academic-output/list/academic.list.html',
            'hint': {
              template: 'This is contacts.detail populating the "hint" ui-vdiew'
            }
          })

          ///////////////////////
          // academic > Detail //
          ///////////////////////

          // You can have unlimited children within a state. Here is a second child
          // state within the 'academic' parent state.
          .state('academic.detail', {

            // Urls can have parameters. They can be specified like :param or {param}.
            // If {} is used, then you can also specify a regex pattern that the param
            // must match. The regex is written after a colon (:). Note: Don't use capture
            // groups in your regex patterns, because the whole regex is wrapped again
            // behind the scenes. Our pattern below will only match numbers with a length
            // between 1 and 4.

            // Since this state is also a child of 'academic' its url is appended as well.
            // So its url will end up being '/academic/{academicId:[0-9]{1,4}}'. When the
            // url becomes something like '/academic/123' then this state becomes active
            // and the $stateParams object becomes { academicId: 123 }.
            url: '/{academicId:[0-9]{1,4}}',
            title: 'Academic detail',
            // If there is more than a single ui-view in the parent template, or you would
            // like to target a ui-view from even higher up the state tree, you can use the
            // views object to configure multiple views. Each view can get its own template,
            // controller, and resolve data.

            // View names can be relative or absolute. Relative view names do not use an '@'
            // symbol. They always refer to views within this state's parent template.
            // Absolute view names use a '@' symbol to distinguish the view and the state.
            // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
            views: {

              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'app/components/academic-output/detail/academic.detail.html',
                controller: 'uiMonitorLocalDetailItemCtrl',
                //['$scope', '$stateParams', 'utils',
                //  function (  $scope,   $stateParams,   utils) {
                //    $scope.academicData = utils.findById($scope.academic, $stateParams.academicId);
                //  }]
              },
              'hint': {
                template: 'This is contacts.detail populating the "hint" ui-view22'
              }
            }
          })

          //////////////////////////////
          // academic > Detail > Item //
          //////////////////////////////

          .state('academic.detail.item', {

            // So following what we've learned, this state's full url will end up being
            // '/academic/{academicId}/item/:itemId'. We are using both types of parameters
            // in the same url, but they behave identically.
            url: '/item/:itemId',
            title: 'Academic item detail',
            views: {

              // This is targeting the unnamed ui-view within the parent state 'academicData.detail'
              // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
              // We could instead just set templateUrl and controller outside of the view obj.
              '': {
                templateUrl: 'app/components/academic-output/detail/academic.detail.item.html',
                controller: 'uiMonitorLocalDetailCtrl'
                  //['$scope', '$stateParams', '$state', 'utils',
                  //function (  $scope,   $stateParams,   $state,   utils) {
                  //  $scope.item = utils.findById($scope.academicData.items, $stateParams.itemId);
                  //
                  //  $scope.edit = function () {
                  //    // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
                  //    // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
                  //    // Here we are going down to the child state 'edit' (full name of 'academic.detail.item.edit')
                  //    $state.go('.edit', $stateParams);
                  //  };
                  //}]
              },
              'hint@': {
                template: ' This is contacts.detail.item overriding the "hint" ui-view'
              }
            }
          })

          /////////////////////////////////////
          // academic > Detail > Item > Edit //
          /////////////////////////////////////

          // Notice that this state has no 'url'. States do not require a url. You can use them
          // simply to organize your application into "places" where each "place" can configure
          // only what it needs. The only way to get to this state is via $state.go (or transitionTo)
          .state('academic.detail.item.edit', {
            views: {

              // This is targeting the unnamed view within the 'academic.detail' state
              // essentially swapping out the template that 'academic.detail.item' had
              // inserted with this state's template.
              '@academic.detail': {
                templateUrl: 'app/components/academic-output/detail/academic.detail.item.edit.html',
                controller: 'uiMonitorLocalEditCtrl',
              }
            }
          });
      }
    ]
  );
