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
        vm.loginRecover = loginRecover;
        vm.loginRenew = loginRenew;
        vm.logout = logout;
        vm.back = back;
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
                        vm.messageError = processEngine.getMessageError(20000);
                        vm.showError= true;
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
					if ($state.current.name!="root.main"){
						ticketService.delTicket();
						$state.go('root.login');
					}
            		getMenu();
            	}else{
					if ($state.current.name!="root.login.recuperate"){
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
        
        function getMenuReport(){
        	var menuReporte = processEngine.getMenuReport(vm);
//        	var menuReporte = [{
//        	    "nombre": "Administración de solución",
//        	    "wf": 1,
//        	    "tipo": null,
//        	    "childrens": [{
//        	        "nombre": "Grupos",
//        	        "wf": 1,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Inscripción en perfiles",
//        	        "wf": 1,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Inscripción en procesos",
//        	        "wf": 1,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Procesos",
//        	        "wf": 1,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Procesos sin perfil asignado",
//        	        "wf": 1,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Reemplazos",
//        	        "wf": 1,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }]
//        	}, {
//        	    "nombre": "Alarmas",
//        	    "wf": 40,
//        	    "tipo": null,
//        	    "childrens": [{
//        	        "nombre": "Alarmas ejecutadas",
//        	        "wf": 40,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }]
//        	}, {
//        	    "nombre": "Reportes de gestión",
//        	    "wf": 28,
//        	    "tipo": null,
//        	    "childrens": [{
//        	        "nombre": "Atención x Expediente",
//        	        "wf": 28,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Cantidad de Exp. x Actividad",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Cantidad de Exp. x Usuario",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Resumen de Cantidad",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Resumen de operación",
//        	        "wf": 28,
//        	        "tipo": "E",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Resumen de tiempo",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Tiempo de atención x Actividad",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Tiempo de atención x Usuario",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Tiempo de servicio x Actividad",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }, {
//        	        "nombre": "Tiempo de servicio x Usuario",
//        	        "wf": 28,
//        	        "tipo": "G",
//        	        "childrens": []
//        	    }]
//        	}];
        	
        	//alert(menuReporte);
//            vm.menuReport = [
//                           	{
//                        	   "nombre": "Reportes",
//                               "wf": 1,
//                               "tipo":null,
//                        	   "childrens":+menuReporte
//                           	}          
//          ]; 
        }   
    }
})();