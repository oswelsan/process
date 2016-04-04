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
        alert("main");
        vm.services = [
        {
            title: "TRABAJO",
            value: "1",
            route: "root.tasks",
            subservices: [{
                name: "Vencidos",
                value: "11",
                route: "root.tasks",
                icon: "glyphicon glyphicon-alert text-danger",
                subsubservices:[{
                	name: "Vencidos 1",
                    value: "111",
                    route: "root.tasks",
                    icon: "glyphicon glyphicon-alert text-danger"
                }, {
                	name: "Vencidos 2",
                    value: "112",
                    route: "root.tasks",
                    icon: "glyphicon glyphicon-alert text-danger"
                }]
            }, {
                name: "En Riesgo",
                value: "12",
                route: "root.tasks",
                icon: "glyphicon glyphicon-alert text-warning"
            }, {
                name: "Vigentes",
                value: "13",
                route: "root.tasks",
                icon: "glyphicon glyphicon-pencil text-primary"
            }]      
        },
        {
        	title: "CARTELERA",
        	value: "2",
        	route: "root.tasks",
        	subservices: [{
        	    name: "Alarmas",
        	    value: "21",
        	    route: "root.tasks",
        	    icon: "glyphicon glyphicon-alert text-danger",
        	    subsubservices:[{
        	    	name: "Alarma 1",
        	        value: "211",
        	        route: "root.tasks",
        	        icon: "glyphicon glyphicon-alert text-danger"
        	    }, {
        	    	name: "Alarma 2",
        	        value: "212",
        	        route: "root.tasks",
        	        icon: "glyphicon glyphicon-alert text-danger"
        	    }]
        	}, {
        	    name: "Administracion de ambiente",
        	    value: "22",
        	    route: "root.tasks",
        	    icon: "glyphicon glyphicon-alert text-warning"
        	}]      
        }
        
        ];  
        
        
    }
})();





