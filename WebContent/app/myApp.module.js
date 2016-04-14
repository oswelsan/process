(function () {
    'use strict';

   var myApp = angular.module('myApp', [
        'ui.router',
        'ui.bootstrap',
        'smart-table',
        'ngProcess',
        'gettext',
        'blockUI'
    ]);

   myApp.run(function (gettextCatalog) {
	    gettextCatalog.currentLanguage = 'es';
   });
   
   myApp.config(function(blockUIConfig) {
	   //blockUIConfig.autoInjectBodyBlock = false;
	   blockUIConfig.template = "<div class='block-ui-overlay'><img src='app/images/spinner2.gif' width='60px'></div>";
   })

})();

    
