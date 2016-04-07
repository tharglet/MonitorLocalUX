'use strict';

/**
 * Application javascript.
 * Any none angular stuff can go in here along with the angular bootstrapping,
 * method too!
 */

// Load the above module and bootstrap it.
require(
  [
   'app'
  ],
  function () {
    angular.element(document).ready(function() {
      angular.bootstrap(document,
        [
          'app'
        ]
      );
    });
  }
);
