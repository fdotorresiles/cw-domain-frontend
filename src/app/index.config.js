(function() {
  'use strict';

  angular
    .module('cw')
    .config(config)
    .config(function($mdThemingProvider){
    $mdThemingProvider.theme("custom").primaryColor("blue",{
      'default': '500',
      'hue-1': '500',
      'hue-2': '600'
    }).accentColor("deep-purple",{
      'default': '900',
      'hue-1': '500',
      'hue-2': '600'
    });
  });

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }




})();
