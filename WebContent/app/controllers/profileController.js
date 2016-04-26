(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['processEngine', '$state','ticketService'];

    function ProfileController(processEngine, $state,ticketService) {
    	var vm = this;
        vm.title = 'Profile';
        vm.id = '1';
        vm.profile = [];
        vm.load_profile = load_profile;
        vm.showInfo = false;
        vm.showError = false;
        
        vm.load_change_pass = load_change_pass;
        vm.load_change_pass_apro  = load_change_pass_apro;
        vm.load_change_sec_questions = load_change_sec_questions;
        vm.oldpass = null;
        vm.change_pass = change_pass;
        vm.change_pass_apro = change_pass_apro;
        vm.change_sec_questions = change_sec_questions;
        activate();
        
        function activate() {
        	if (ticketService.isAuthed()){
        	    if($state.current.name=="root.main.profile"){
        	    	getData();
        		}else if($state.current.name=="root.main.changepass"){
        		}else if($state.current.name=="root.main.changepassapro"){
        		}else if($state.current.name=="root.main.changesecquest"){
        		}else{
					ticketService.delTicket();
					$state.go('root.login');
				}
        	}
            return false;
        }

        function getData() {
            processEngine.getProfile()
                .then(function (data) {
//                	vm.profile.nombre = data.nombre;
//                	vm.profile.email = data.email;
//                	vm.profile.formatoFecha = data.formatoFecha;
//                	vm.profile.activoD = data.activoD;
//                	vm.profile.nuDocLect = data.nuDocLect;
//                	vm.profile.preguntaVencida = data.preguntaVencida;
//                	vm.profile.cantDiasVencLic = data.cantDiasVencLic;
                	
                	vm.profile.nombre = "Luis Alfredo Lozada García";
                	vm.profile.email = "luis@gmail.com";
                	vm.profile.formatoFecha = "DD/MM/YYYY";
                	vm.profile.activoD = 0;
                	vm.profile.nuDocLect = "";
                	vm.profile.preguntaVencida = false;
                	vm.profile.cantDiasVencLic = 0;
                	
                    return vm.profile;
                });
        }
   
        function load_profile(){
        	$state.go('root.main.profile');
        }
        
        function load_change_pass(){
        	$state.go('root.main.changepass');
        }
        
        function load_change_pass_apro(){
        	$state.go('root.main.changepassapro');
        }
        
        function load_change_sec_questions(){
        	$state.go('root.main.changesecquest');
        }
        
        function change_pass(){
        	if(vm.user.oldpass != "asd"){
        		vm.showError = true;
        		vm.messageError = "Incorrect old password";
        	}else if(vm.user.pass != vm.user.confirmpass){
        		vm.showError = true;
        		vm.messageError = processEngine.getMessageError(12);
        	}else{
        		vm.showError = false;
        		vm.messageError = null;
        		
        		processEngine.changePassProfile(vm)
        		.then(function (data) {
        			vm.showInfo = true;
            		vm.messageInfo = "Process completed successfully!";
                });
        	}

        }
        
        function change_pass_apro(){
        	if(vm.user.oldpass != "asd"){
        		vm.showError = true;
        		vm.messageError = "Incorrect old password";
        	}else if(vm.user.pass != vm.user.confirmpass){
        		vm.showError = true;
        		vm.messageError = processEngine.getMessageError(12);
        	}else{
        		vm.showError = false;
        		vm.messageError = null;
        		
        		processEngine.changePassApprovalProfile(vm)
        		.then(function (data) {
        			vm.showInfo = true;
            		vm.messageInfo = "Process completed successfully!";
                });
        	}
        }
         
        function change_sec_questions(){  		
    		processEngine.changeSecurityQuestionProfile(vm)
    		.then(function (data) {
    			vm.showInfo = true;
        		vm.messageInfo = "Process completed successfully!";
            });
        }

    }
    
})();