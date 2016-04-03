(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    MainController.$inject = ['processEngine','user','$scope','$state']

    function MainController(processEngine, user, $scope, $state){
        var vm = this;
        
        vm.user = { name: "", pass: "", envi: "" };
        vm.isLogged = processEngine.isLogged;
        vm.login = login;
        vm.loginRecover = loginRecover;
        vm.loginRenew = loginRenew;
        vm.logout = logout;
        vm.response = {};
        vm.environments = [];
        activate();
        
        vm.title = "Now Viewing home!";
        vm.isCollapsed = true;
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
        
        function login() {
            processEngine.postSession(vm)
                .then(function (data) {
                	if (data == null) {
                        alert('Internal Error!')
                        vm.isLogged = false;
                    }else if (data.message === "15140") {
                        alert('Already Signed in!')
                        vm.isLogged = true;
                    } else if(data.message === "25241154"){
                    	alert('Session Dead!')
                        vm.isLogged = false;
                    }else{
                    	alert('Signed in!')
                        user.name = vm.user.name;
                        user.pass = vm.user.pass;
                        user.envi = vm.user.envi;
                        vm.isLogged = true;
                        $state.go('root.tasks');
                    }
                    vm.response = data;
                    return vm.response;
                });
        }
        
        function loginRecover() {
            processEngine.getSession(vm.user)
                .then(function (data) {
                    vm.response = data;
                    user.name = vm.user.name;
                    user.pass = vm.user.pass;
                    $state.go('root.tasks');
                    return vm.response;
                })
        }

        function loginRenew() {
            processEngine.putSession(vm.user)
                .then(function (data) {
                    vm.response = data
                    user.name = vm.user.name;
                    user.pass = vm.user.pass;
                    $state.go('root.tasks')
                    return vm.response;
                })
        }

        function logout() {
            processEngine.deleteSession()
                .then(function (data) {
                    alert('Signed out!');
                    vm.response = data;
                    return vm.response;
                })
        }

        function activate() {
            if (!!$state.params.environmentName) {
               return verifyEnvironment();
            }
            if (!!user.server) {
                vm.user.server = user.server;
                return vm.user.server;
            }
            else {
            	getEnvironments();
                return false; 
            }
        }

        function verifyEnvironment() {
            processEngine.verifyEnvironment($state.params.environmentName)
                .then(function (isVerified) {
                    if (isVerified) {
                        vm.user.server = $state.params.environmentName;
                        return isVerified;
                    } else {

                        getEnvironments();
                        return isVerified;
                    }
                })
        }
        
        function getEnvironments() {
        	
            processEngine.getEnvironments()
                .then(function(data) {
                    vm.environments = data;
                    return vm.environments;
                });
        }
        
        function setEnvironment(environment) {
        	user.server = environment;
        }
    }
})();





