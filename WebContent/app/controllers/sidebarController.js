(function () {
    'use strict'

    angular
        .module('myApp')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['processEngine', '$state'];

    function SidebarController(processEngine, $state) {
        var vm = this;
    }


})();