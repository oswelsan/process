(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['processEngine', 'user','$state','ticketService'];

    function SessionsController(processEngine, user, $state, ticketService) {
        var vm = this;

        vm.title = "Login";
        vm.user = { name: "", pass: "", envi: "" };
        vm.isLogged = processEngine.isLogged;
        vm.isShowMenuFile = false;
        vm.isShowMenuReport = false;
        vm.login = login;
        vm.showChangePass = false;
        vm.loginRecover = loginRecover;
        vm.loginRenew = loginRenew;
        vm.logout = logout;
        vm.back = back;
        vm.forgot = forgot;
        vm.forgot_password = forgot_password;
        vm.profile = profile;
        vm.change_pass = change_pass;
        vm.change_pass_apro  = change_pass_apro;
        vm.change_sec_questions = change_sec_questions;
        vm.security_questions = security_questions;
        vm.goServices = goServices;
        vm.menuFile = [];
        vm.response = {};
        vm.environments = [];
        vm.showError = false;
        vm.messageError = "";
        activate();


        function login() {
            processEngine.postSession(vm)
                .then(function (data) {
                	if (data == null) {    
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
        	if (ticketService.isAuthed()){        		
                processEngine.deleteSession()
                .then(function (data) {
                    vm.response = data;  
                    if (data.statusCode == "0"){                    	 
                        ticketService.saveTicket('');
                        $state.go('root.login');
                    }                     
                    return vm.response;
                });

        	}
        }
        
        function back() {
        	 $state.go('root.login');
        }
        
        function goServices(){
        	 $state.go('root.main.service');
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
            	if (ticketService.isAuthed()){
            	    if($state.current.name=="root.main.profile"){
            		}else if($state.current.name=="root.main.changepass"){
            		}else if($state.current.name=="root.main.changepassapro"){
            		}else if($state.current.name=="root.main.changesecquest"){
            		}else if ($state.current.name!="root.main"){
						ticketService.delTicket();
						$state.go('root.login');
					}
            		getMenu();
            	}else{
            		if($state.current.name=="root.login.forgot"){
            		}else if($state.current.name=="root.login.question"){
            		}else if ($state.current.name!="root.login.recuperate"){
						if ($state.current.name!="root.login"){
							$state.go('root.login');
						}
						
						ticketService.delTicket();
						getEnvironments();					
					}  		
            	}
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
        
        function getMenu() {
        	processEngine.getMenuFile()
        	.then(function (respuesta) {
        		if(respuesta==''){
        			vm.isShowMenuFile = false;
        		}else{
            		vm.isShowMenuFile = true;
            		vm.menuFile = respuesta;    		
        		}
        		
                processEngine.getMenuReport()
                .then(function (respuesta) {
                	if(respuesta==''){
            			vm.isShowMenuReport = false;
            		}else{
                		vm.isShowMenuReport = true;
                		vm.menuReport = respuesta;    		
            		}
                })
            })
        }
        
        function forgot() {
        	$state.go('root.login.forgot');
        }
        
        function forgot_password(){
        	alert("cambiando el password");
        	$state.go('root.login.question');
        }
        
        function security_questions(){
        	alert("Preguntas de seguridad aceptadas");
        	$state.go('root.login');
        }
        
        function profile(){
        	$state.go('root.main.profile');
        }
        
        function change_pass(){
        	$state.go('root.main.changepass');
        }
        
        function change_pass_apro(){
        	$state.go('root.main.changepassapro');
        }
        
        function change_sec_questions(){
        	$state.go('root.main.changesecquest');
        }
    }
})();