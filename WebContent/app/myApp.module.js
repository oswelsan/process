(function () {
    'use strict';

   var myApp = angular.module('myApp', [
        'ui.router',
        'ui.bootstrap',
        'smart-table',
        'ngProcess',
        'gettext'
    ]);

   myApp.run(function (gettextCatalog) {
	    gettextCatalog.currentLanguage = 'es';
   });

})();

    
