(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('EnvironmentsController', EnvironmentsController);

    EnvironmentsController.$inject = ['processEngine', 'user'];

    function EnvironmentsController(processEngine, user) {
        var vm = this;
        vm.environments = [];
        vm.title = 'Environments';
        vm.setEnvironment = setEnvironment;
            

        activate();

        function activate() {
            return getEnvironments()
        }

        function getEnvironments() {
            processEngine.getEnvironments()
                .then(function(data) {
                    vm.environments = data;
                    return vm.environments;
                });
        }

        function setEnvironment(environment) {
        	environment = "sql";
        	user.server = environment;
        }
    }


})();


