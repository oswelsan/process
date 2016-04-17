(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('ServiceController', ServiceController);

    ServiceController.$inject = ['processEngine', 'ticketService'];

    function ServiceController(processEngine, ticketService) {
        var vm = this;

        vm.services = [];
        activate();

        function activate() {
        	if (ticketService.isAuthed()){
        		getServices();
        	}
            return false; 
        }

        function getServices() {        	
            processEngine.getServices()
                .then(function(data) {
                    vm.services = data;
                    return vm.services;
                });
        }        

    }
})();