'use strict';
define(['bootstrap-js'], function() {
  (function ($){
    $(document).ready(function(){
      $('.side-panel-button').click(function(){
        $('body').toggleClass('with-sidebar');
      });
    });
  })(jQuery);
});