'use strict';

define (
  function () {
    
    // This function represents the constructor of the directive that will be wrapped in an array style injector def at the module
    // level..
    return function (theme, $templateRequest, $compile, $q, $http, $sce) {
      var template = 'components/kint-ui/directives/widgets/' + theme + '/help.html';
      
      return {
        restrict: 'A',
        scope: {
          title: '@helpTitle', // Bring the text of the "helpTitle" attribute through to this scope.
        },
        link: function ($scope, element, attrs) {
          var URL = $scope.$root.application.config.backend + '/help';
          var anchor =  attrs['helpId'];
          var page = attrs['helpPage'];
          
          // The URL.
          var theUrl = attrs['kintUiHelp'] ? attrs['kintUiHelp'] : URL;
          
          if (theUrl && page && anchor) {
            
            // Combine multiple promises into a single promise that will be resolved with a single
            // array of results where the first element is the result of the first promise...
            $q.all (
              [$templateRequest(template),
              $http({
                method: 'GET',
                url: theUrl + '/' + page
              })
            ]).then(function (results) {
              
              // Parse into JQ-like objects.
              var tpl = angular.element(results[0]);
//              var htmlTxt = results[1].data.replace(/(^\s*|\s*$)/g, '');
              var helpContents =angular.element(results[1].data);
              
              // Create a temporary div to add the stuff to.
              var container = angular.element("<div />");
              
              // We want to split out the title and text from the help resource.
              var title = angular.element( '#' + anchor, helpContents).closest(':header');
              
              if (typeof $scope.title === 'undefined') {
                // Set the title if not supplied.
                $scope.title = title.text();
              }
              
              // Now append the all siblings of the title until we reach another header item.
              // NB: The next until method below is exclusive of the start element and the terminating clause.
              container.append(
                title.nextUntil(':header')
              );
              
              // Now that we have the elements we can add the html to scope.
              $scope.content = $sce.trustAsHtml(container.html());
              
              // We should now add our template to the element here and then call on the compile service to compile and link it up.
              element.append(tpl);
              
              // Given a template, the compile service returns a method that is passed the scope against which it should be compiled.
              $compile(tpl)($scope);
            });
          }
        }
      };
    };
  }
);