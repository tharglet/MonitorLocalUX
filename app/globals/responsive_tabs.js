define (
  ['responsive-bootstrap-toolkit'],
  function(){
  (function($){
    
    $(document).ready(function(){
      
      // Stack breakpoint.
      var stack_breakpoint = "<md";
      
      // Simply swap out tab classes for stacked pills.
      var apply_tab_classes = function () {
        $("ul.responsive-tabs").each(function(){
          if(ResponsiveBootstrapToolkit.is(stack_breakpoint)) {
            // Add the normal tab classes.
            $(this).removeClass("nav-pills nav-stacked").addClass("nav-tabs");
          } else {
            // Add stacked pill classes.
            $(this).removeClass("nav-tabs").addClass("nav-pills nav-stacked");
          }
//          console.log('Current breakpoint: ', ResponsiveBootstrapToolkit.current());
        });
      };
      
      window.apply_tab_classes = ResponsiveBootstrapToolkit.changed(apply_tab_classes, 150);
      
      // Add a listeners that will update the tabs.
      $(window).resize(window.apply_tab_classes);
    });
    
  })(jQuery);
});
