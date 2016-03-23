(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    function indexController() {
        var vm = this;
        vm.message = "Welcome";
    }


})();
