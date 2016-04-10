'use strict';

define (
  function () {
    
    var camelToDash = function (str) {
      return str.replace(/\W+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2');
    };
    
    var extractObject = function (str) {
      return str.replace(/(.+)(\[[^\]]+\]|\..+)$/, "$1");
    };

    var extractProperty = function (str) {
      var res = str.replace(/\[["']([^"']+)["']\]$/, "$1");
      if (!res || res == str) {
        name = str.replace(/.*\.([^\.|\]]+)$/, "$1");
      }
      return res;
    };
    
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
    
    // Default template is to use the inputs.
    var templateType = "input";
    
    return function (theme, $templateRequest, $compile) {
      return {
        restrict: 'E',
        require: '^^form',
        scope : false,
        compile: function( iElem, iAttr ) {
          
          // Return the linking function.
          return {
            pre: function ($scope, iElem, iAttr, form) {
              // Generate the name and label id from the supplied props.
              name = extractProperty(iAttr['ngModel']);
              labelName = name + 'Label';
              
              // Grab the element messages.
              messages = iElem.find('messages');
              if (messages.length > 0) {
                messages = messages.remove();
              } else {
                messages = false;
              }
              
              // Grab the label.
              suppliedLabel = iElem.find('label');
              
              // Horizontal label length.
              horizontalLabel = iAttr['horizontalLabel'];
              
              // The type of the element.
              type = iAttr['type'];
              if (typeof type === 'undefined') {
                type = "text";
              }
              
              switch ( type ) {
                case "date" :
                  templateType = type;
                  type = "text";
                  break;
                case "ref-data" :
                case "ref-object" :
                  templateType = type;
                  
                  // Special directives seperate the model into "object" and "property"
                  iAttr['object'] = extractObject(iAttr['ngModel']);
                  iAttr['property'] = name;
                  
                  // Remove the model to stop it being bound in the compile phase.
                  delete iAttr['ngModel'];
              }
              
              // Columns.
              cols = iAttr['cols'];
              if (typeof cols === 'undefined') {
                // Default to 12 columns.
                cols = 12;
              }
            },
            post: function ($scope, iElem, iAttr, form) {
              // Import the correct template depending on the type.
              var template = 'components/kint-ui/directives/widgets/' + theme + '/' + templateType + '.html';
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
                var inputEl = template.find(templateType)
                  .attr('name', name)
                  .attr('id', name)
                  .attr('aria-labelledby', labelName)
                  
                // Use the supplied type as a subtype.
                if (templateType === 'input') {
                  inputEl.attr('type', type);
                }
                
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
                addAttributes(iAttr, inputEl);
                
                // Add the messages.
                var messageBlock = template.find('.messages-block');
                if (messageBlock.length > 0) {
                  if (messages === false) {
                    // No messages, we should remove the element from the template.
                    template.find('.messages-block').html(messages);
                  } else {
                    messageBlock.html(messages);
                  }
                }
                
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
            }
          };
        },
      };
    };
  }
);