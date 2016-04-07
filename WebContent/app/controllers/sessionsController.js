(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['processEngine', 'user','$state'];

    function SessionsController(processEngine, user, $state) {
        var vm = this;

        vm.title = "Login";
        vm.user = { name: "", pass: "", envi: "" };
        vm.isLogged = processEngine.isLogged;
        vm.login = login;
        vm.loginRecover = loginRecover;
        vm.loginRenew = loginRenew;
        vm.logout = logout;
        vm.back = back;
        vm.response = {};
        vm.environments = [];
        activate();


        function login() {
            processEngine.postSession(vm)
                .then(function (data) {
                	if (data == null) {
                        alert('Internal Error!');
                        vm.isLogged = false;                        
                    }else if (data.statusCode == "15140") {    
                        user.name = vm.user.name;
                        user.pass = vm.user.pass;
                        user.envi = vm.selectedOption.name; 
                        user.sc = data.sessionCaida;
                        vm.isLogged = true;
                        // Preguntar al usuario si elimina o recupera la session
                        $state.go('root.login.recuperate');
                    }else{//TODO validar los otros tipos de errores en proceso de login        
                    	alert('Signed in!');
                        user.name = vm.user.name;
                        user.pass = vm.user.pass;
                        user.envi = vm.user.envi;
                        vm.isLogged = true;
                        $state.go('root.main');
                    }
                    vm.response = data;
                    return vm.response;
                });
        }
        
        function loginRecover() {
            processEngine.getSession(user)
                .then(function (data) {
                	if (data.statusCode == "0"){
                        vm.response = data;
                        user.name = vm.user.name;
                        user.pass = vm.user.pass;
                        $state.go('root.main');                		
                	}
                    return vm.response;
                })
        }

        function loginRenew() {
            processEngine.putSession(user)
                .then(function (data) {
                	if (data.statusCode == "0"){
                        vm.response = data
                        user.name = vm.user.name;
                        user.pass = vm.user.pass;
                        $state.go('root.main');
                	}                    
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
        
        function back() {
        	 alert(user.sc);
        	 $state.go('root.login');
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