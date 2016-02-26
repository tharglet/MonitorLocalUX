'use strict';
define(
  ['app'],
  function(app){
    return  app.registerController ('BreadcrumbController', ['$state', function ($state) {

      // Grab the current state object in full.
      var current_state = $state.$current;
      
      var crumb_titles = Array();
      if (current_state.data && current_state.data.title) {
        crumb_titles[0] = current_state.data.title;
      }
      
      while ((current_state = current_state.$parent)) {
        if (current_state.data && current_state.data.title) {
          crumb_titles[0] = current_state.data.title;
        }
      }
    }]);
  }
);
