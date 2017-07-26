/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('cw')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API',{
      'url':'https://cw-global-api-dot-crawling-domain.appspot.com/api'
    });

})();
