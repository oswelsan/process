(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('TasksController', TasksController);

    TasksController.$inject = ['processEngine', '$stateParams'];

    function TasksController(processEngine, $stateParams) {
        var vm = this;
        vm.title = 'Tasks';
        vm.id = '1';
        vm.tasks = [];
        vm.displayedTasks = [].concat(vm.tasks);



        activate();

        function activate() {
            getFilter();
            getTasks();
        }

        function getTasks() {
            processEngine.getTasks(vm.id)
                .then(function (data) {
                    vm.tasks = data;
                    return vm.tasks;
                });
        }

        function getFilter() {
            switch($stateParams.filter){
                case 0:
                    vm.semaforo = 0;
                    break;
                case 1:
                    vm.semaforo = 1;
                    break;
                case 2:
                    vm.semaforo = 2;
                    break;
                default:
                    vm.semaforo = '';
                    break;
            }

            
        }

    }



})();