'use strict';

define (
  function () {
    
    var camelToDash = function (str) {
      return str.replace(/\W+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2');
    }
    
    var addAttributes = function(atrs, template) {
      angular.forEach(atrs, function(val, name) {
        if (!name.startsWith('$')) {
          switch ( name ) {
          case "class":
            // Add classes rather than setting.
            template.addClass(val);
            break;
          default:
            // Copy the value over.
            template.attr(camelToDash(name), val);
          }
        }
      });
    };
    
    // Generate the name and label id from the supplied props.
    var name;
    var labelName;
    
    // Grab the element messages.
    var messages;
    
    // Grab the label.
    var suppliedLabel;
    
    // Horizontal label length.
    var horizontalLabel;
    
    // The type of the element.
    var type;
    
    // Columns.
    var cols;
    
    // Template type.
    var templateType;
    
    return function (theme, $templateRequest, $compile) {
      return {
        restrict: 'E',
        require: '^^form',
        scope : false,
        compile: function( tElem, tAttr ) {
          
          // Generate the name and label id from the supplied props.
          name = tAttr['ngModel'].replace(/\[["']([^"']+)["']\]$/, "$1");
          if (!name || name == tAttr['ngModel']) {
            name = tAttr['ngModel'].replace(/.*\.([^\.|\]]+)$/, "$1");
          }
          labelName = name + 'Label';
          
          // Grab the element messages.
          messages = tElem.find('messages').remove().html();
          
          // Grab the label.
          suppliedLabel = tElem.find('label');
          
          // Horizontal label length.
          horizontalLabel = tAttr['horizontalLabel'];
          
          // The type of the element.
          type = tAttr['type'];
          if (typeof type === 'undefined') {
            type = "text";
          }
          
          // Columns.
          cols = tAttr['cols'];
          if (typeof cols === 'undefined') {
            // Default to 12 columns.
            cols = 12;
          }
          
          // Template type.
          templateType = type.toLowerCase();
          if (templateType === 'date') {
            templateType = 'date';
          }
          
          // Return the linking function.
          return function ($scope, iElem, iAttr, form) {
            // Import the correct template depending on the type.
            var template = 'components/kint-ui/directives/widgets/' + theme + '/input' + (horizontalLabel ? '-horizontal' : '' ) + '.html';
            $templateRequest(template).then(function(html) {
              
              // Grab the template as a jQuery type object which will allow us to modify it.
              var template = angular.element(html);
              
              // Set the label.
              var label = template.find('label').text ( suppliedLabel.remove().text() ); // .replace(template.find('label'));
              label
                .attr('aria-label', label.text())
                .attr('id', labelName)
                .attr('for', name);
              
              // Input element.
              var inputEl = template.find('input')
                .attr('name', name)
                .attr('id', name)
                .attr('aria-labelledby', labelName)
                .attr('type', type);
              
              if (horizontalLabel) {
                
                // Need to add the classes to the correct elements.
                var componentWidth = cols - horizontalLabel;
                label.addClass('span-' + horizontalLabel);
                inputEl.parent().addClass('span-' + componentWidth);
              } else {
                
                // Just add to the root element.
                template.addClass("span-" + cols);
              }
              
              // Add all the attributes supplied to the input element.
              addAttributes(tAttr, inputEl);
              
              // Add the messages.
              template.find('.messages-block').html(messages);
              
              // Create a scope that inherits from the current here. This allows us to bind the,
              // form controller and other needed parts for the templates, while preserving the
              // existing bindings.
              var privateScope = $scope.$new(false);
              
              // Add the form to the scope for referencing in our template.
              privateScope.$form = form;
              privateScope.property = name;
              
              // Replace the content.
              iElem.replaceWith(template);
              
              // Compile the template.
              $compile(template)(privateScope);
            });
          };
        },
      };
    };
  }
);