(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    MainController.$inject = ['processEngine','$scope','$state']

    function MainController(processEngine, $scope, $state){
        var vm = this;

        vm.title = "Now Viewing home!";
        vm.isCollapsed = true;
        vm.services = [{
            title: "Trabajo",
            value: null,
            route: "root.tasks",
            subservices: [{
                name: "Vencidos",
                value: "2",
                route: "root.tasks",
                icon: "glyphicon glyphicon-alert text-danger"
            }, {
                name: "En Riesgo",
                value: "1",
                route: "root.tasks",
                icon: "glyphicon glyphicon-alert text-warning"
            }, {
                name: "Vigentes",
                value: "0",
                route: "root.tasks",
                icon: "glyphicon glyphicon-pencil text-primary"
            }]
        }];

    }


})();



