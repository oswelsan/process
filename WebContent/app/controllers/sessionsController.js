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
        vm.isShowBarEmails = false;
        vm.barEmails = [];
        vm.login = login;
        vm.showChangePass = false;
        vm.loginRecover = loginRecover;
        vm.loginRenew = loginRenew;
        vm.logout = logout;
        vm.back = back;
        vm.forgot = forgot;
        vm.forgot_password = forgot_password;
        vm.security_questions = security_questions;
        vm.goServices = goServices;
        vm.menuFile = [];
        vm.response = {};
        vm.environments = [];
        vm.showError = false;
        vm.messageError = "";
        vm.profile = profile;
        activate();


        function login() {
            processEngine.postSession(vm)
                .then(function (data) {
                	if (!ticketService.isStatusCode()){
                       	if (data == null) {    
                            vm.isLogged = false;
                            vm.showError = true;
                            vm.messageError = processEngine.getMessageError(20000);                            
                        }else{
                            user.name = vm.user.name;
                            user.pass = vm.user.pass;
                            user.envi = vm.user.envi;
                            vm.isLogged = true;
                            $state.go('root.main');                        	
                        } 
                        vm.response = data;
                        return vm.response;
                	}else{                 		
                		if (ticketService.getStatusCode() == "15140") {   
                            user.name = vm.user.name;
                            user.pass = vm.user.pass;
                            user.envi = vm.selectedOption.name; 
                            user.sc = data.sessionCaida;
                            vm.isLogged = true;
                            ticketService.delStatusCode();
                            // Preguntar al usuario si elimina o recupera la session
                            $state.go('root.login.recuperate');
                        }else{
                            vm.isLogged = false;
                            vm.showError = true;
                            vm.messageError = processEngine.getMessageError(ticketService.getStatusCode());
                            ticketService.delStatusCode();
                        }                		
                	}
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
            		if (!ticketService.isStatusCode()){
                        ticketService.delTicket();
                        $state.go('root.login');
            		}else{
                        vm.isLogged = false;
                        vm.showError = true;
                        vm.messageError = processEngine.getMessageError(ticketService.getStatusCode());         			
            		}                	
                    vm.response = data;                    
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
               //return verifyEnvironment();
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
						ticketService.delStatusCode();
						$state.go('root.login');
					}
            	    loadContext();
            	}else{
            		if($state.current.name=="root.login.forgot"){
            		}else if($state.current.name=="root.login.question"){
            		}else if ($state.current.name!="root.login.recuperate"){
						if ($state.current.name!="root.login"){
							$state.go('root.login');
						}
						ticketService.delTicket();
						ticketService.delStatusCode();
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
        
        function loadContext() {
        	getMenuFile()
			.then(function (respuesta) {
				getMenuReport();		
			 })
			.then(function (respuesta) {
				getEmails();
			});
        }
        
        function getMenuFile() {
            return processEngine.getMenuFile()
            .then(function (respuesta) {
            	if (!ticketService.isStatusCode()){
            		if(respuesta==''){
            			vm.isShowMenuFile = false;
            		}else{
                		vm.isShowMenuFile = true;
                		vm.menuFile = respuesta;    		
            		}           		
            	}else{
                    vm.isLogged = false;
                    vm.showError = true;
                    vm.messageError = processEngine.getMessageError(ticketService.getStatusCode());
            	} 
            });        	
        }        
        
        function getMenuReport() {
            processEngine.getMenuReport()
            .then(function (respuesta) {
            	if (!ticketService.isStatusCode()){
                   	if(respuesta==''){
            			vm.isShowMenuReport = false;
            		}else{
                		vm.isShowMenuReport = true;
                		vm.menuReport = respuesta;    		
            		}            		
            	}else{
                    vm.isLogged = false;
                    vm.showError = true;
                    vm.messageError = processEngine.getMessageError(ticketService.getStatusCode());
            	} 
            });        	
        }
        
        function getEmails() {
        	processEngine.getEmails()
        	.then(function (respuesta) {
        		if (!ticketService.isStatusCode()){
        	        vm.isShowBarEmails = true;        	        
        	        vm.barEmails = respuesta;
        		}else{
                    vm.isLogged = false;
                    vm.showError = true;
                    vm.messageError = processEngine.getMessageError(ticketService.getStatusCode());
        		}
            });
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
    }
})();
