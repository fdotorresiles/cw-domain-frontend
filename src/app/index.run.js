(function() {
  'use strict';

  angular
    .module('cw')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
