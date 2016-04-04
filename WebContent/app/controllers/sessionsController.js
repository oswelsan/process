(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['processEngine', 'user','$state'];

    function SessionsController(processEngine, user, $state) {
        var vm = this;

        vm.title = "Login"
        vm.user = { name: "", pass: "", envi: "" };
        vm.isLogged = processEngine.isLogged;
        vm.login = login;
        vm.loginRecover = loginRecover;
        vm.loginRenew = loginRenew;
        vm.logout = logout;
        vm.response = {};
        vm.environments = [];
        activate();


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
                        $state.go('root.main');
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