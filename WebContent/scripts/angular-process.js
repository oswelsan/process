﻿(function(){
    'use strict';

    angular
    .module('ngProcess', []);
    
    angular
        .module('ngProcess')
        .constant('API', 'http://131.255.104.36:9092/process/api')
        //.constant('API', ' http://demo3025227.mockable.io')
        .factory('ticketInterceptor', ticketInterceptor)
        .service('ticketService', ticketService)
        .factory('processEngine', processEngine)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('ticketInterceptor');
        });

    //Interceptor to retrieve and add tickets.
    function ticketInterceptor(API, ticketService) {
        return {
            request: function (config) {
                var ticket = ticketService.getTicket();
                if (config.url.indexOf(API) == 0 && ticket && !config.headers.Authorization) {
                    config.headers.Authorization = 'Bearer ' + ticket;
                }
                return config;
            },

            response: function (res) {
				var ticket = res.data.ticket; 				
                if (res.config.url.indexOf(API) == 0 && ticket) {
                    ticketService.saveTicket(ticket);
                }
                return res;
            },

            responseError: function (rejection) {
            	ticketService.statusCode(rejection.status);
                return rejection;

            }

        }
    }

    //Ticket Handling
    function ticketService($window) {
        var self = this;

        self.saveTicket = saveTicket;
        self.getTicket = getTicket;
        self.delTicket = delTicket;
        self.isAuthed = isAuthed;
        //manejo del codigo de error
        self.statusCode = statusCode;
        self.getStatusCode = getStatusCode;
        self.delStatusCode = delStatusCode;
        self.isStatusCode = isStatusCode;        

        function saveTicket(ticket) {
            $window.localStorage['ticket'] = ticket;
        }

        function getTicket() {
            return $window.localStorage['ticket'];
        }

        function delTicket() {
            $window.localStorage.removeItem('ticket');
        }

        function isAuthed() {
            var ticket = self.getTicket();
            if (ticket) {
                return true;
            } else {
                return false;
            }
        }

        function statusCode(code) {
            $window.localStorage['statusCode'] = code;
        }    
        
        function getStatusCode() {
            return $window.localStorage['statusCode'];
        }    
        
        function delStatusCode() {
            $window.localStorage.removeItem('statusCode');
        }   
        
        function isStatusCode() {
            var ticket = self.getStatusCode();
            if (ticket) {
                return true;
            } else {
                return false;
            }
        }        
    }
    //Api request handler.
    function processEngine($http, API){
        var isPrimed = false;
        var primePromise;
         
        //Requests
        var engine = {
            //$environments
            getEnvironments: getEnvironments,
            verifyEnvironment: verifyEnvironment,
            //$sessions
            getSession: getSession,
            postSession: postSession,
            putSession: putSession,
            deleteSession: deleteSession,
            //services
            getServices: getServices,
            //$tasks
            getTasks: getTasks,
            getProfile: getProfile,
            getMessageError: getMessageError,
            getMenuFile:getMenuFile,
            getMenuReport:getMenuReport,
<<<<<<< HEAD
            getEmails:getEmails
=======
>>>>>>> branch 'master' of https://github.com/oswelsan/process
            changePassProfile:changePassProfile,
            changePassApprovalProfile:changePassApprovalProfile,
            changeSecurityQuestionProfile:changeSecurityQuestionProfile
        };

        return engine;

        //$environments
        function getEnvironments() {
        	return $http.get(API + '/admin/environments').then(getEnvironmentsComplete);
            	//.catch(getEnvironmentsFailed);

            function getEnvironmentsComplete (response) {
                return response.data;
            }

            function getEnvironmentsFailed(error) {
                console.log('Get Environments Failed.' + error.data)
            }
        }

        function verifyEnvironment(serverName) {
        	return $http.get(API + '/environments/' + serverName).then(verifyEnvironmentComplete);
                //.catch(verifyEnvironmentFailed);

            function verifyEnvironmentComplete(response) {
                if (response.data === true) {
                    return true;
                } else {
                    return false;
                }
            }

            function verifyEnvironmentFailed(error) {
                console.log('Nof Found');
                return error;
            }
        }

        //$sessions
        function getSession(user) {
            return $http.get(API + '/sessions/'+user.envi+'/sc/'+user.sc,
            {
                headers: {
                    'Authorization': 'Basic ' + btoa(user.name + ':' + user.pass)
                }
            })
                .then(getSessionComplete);
                //.catch(getSessionFailed);

            function getSessionComplete(response){
                return response.data;
            }

            function getSessionFailed(error) {
                return error.data;
            }
        }

        function postSession(vm) {
            return $http.post(API + '/sessions/'+vm.selectedOption.name,
                '', {
                    headers: {
                        'Authorization': 'Basic ' + btoa(vm.user.name + ':' + vm.user.pass)
                    }
                })
                .then(postSessionComplete);
            //.catch(postSessionFailed);

            function postSessionComplete(response) {
                return response.data;
            }

            function postSessionFailed(error) {
                return error.data;
            }

        }

        function putSession(user) {
            return $http.put(API + '/sessions/'+user.envi+'/sc/'+user.sc,'',
            {
                headers: {
                    'Authorization': 'Basic ' + btoa(user.name + ':' + user.pass)
                }
            })
                .then(putSessionComplete);
                //.catch(putSessionFailed);

            function putSessionComplete(response) {
                return response.data;
            }
            
            function putSessionFailed(error) {
                return error.data
            }
        }

        function deleteSession() {
        	return $http.delete(API + '/sessions')
            .then(deleteSessionComplete);
            //.catch(deleteSessionFailed);

            function deleteSessionComplete(response) {
                return response.data;
            }

            function deleteSessionFailed(error) {
                console.log('Failed to delete session.' + error.data);
            }

        }

        //$tasks
        function getTasks(id) {
            return $http.get(API + '/tasks' + '/' + id)
             .then(getTasksComplete);
             //.catch(getTasksFailed);

	         function getTasksComplete(response) {
	             console.log("Encontrado Process");
	             return response.data;
	         }
	
	         function getTasksFailed(error) {
	             console.log("Failed to get tasks" + error.data);
	         }
        }
        
        //$profile
        function getProfile() {
            return $http.get(API + '/profile')
                        .then(getProfileComplete);
                        //.catch(getProfileFailed);

                    function getProfileComplete(response){
                        return response.data;
                    }

                    function getProfileFailed(error) {
                        return error.data;
                    }
        }
        
        function changePassProfile(vm) {
            return $http.get(API + '/updatesecurity?ctx=2&clave1=vieja_clave&clave2=nvaclave&clave3='+vm.user.pass)
                        .then(changePassProfileComplete);
                        //.catch(changePassProfileFailed);

                    function changePassProfileComplete(response){
                        return response.data;
                    }

                    function changePassProfileFailed(error) {
                        return error.data;
                    }
        }
        
        function changePassApprovalProfile(vm) {
            return $http.get(API + '/updatesecurity?ctx=1&clave1=firmanueva&clave2=pregunta&clave3=respuesta')
                        .then(changePassApprovalProfileComplete);
                        //.catch(changePassApprovalProfileFailed);

                    function changePassApprovalProfileComplete(response){
                        return response.data;
                    }

                    function changePassApprovalProfileFailed(error) {
                        return error.data;
                    }
        }
        
        function changeSecurityQuestionProfile(vm) {
            return $http.get(API + '/updatesecurity?ctx=0&clave1=Pregunta&clave2=respuesta&clave3=firma')
                        .then(changeSecurityQuestionProfileComplete);
                        //.catch(changeSecurityQuestionProfileFailed);

                    function changeSecurityQuestionProfileComplete(response){
                        return response.data;
                    }

                    function changeSecurityQuestionProfileFailed(error) {
                        return error.data;
                    }
        }
        
        
        function changePassProfile(vm) {
            return $http.get(API + '/updatesecurity?ctx=2&clave1=vieja_clave&clave2=nvaclave&clave3='+vm.user.pass)
                        .then(changePassProfileComplete);
                        //.catch(changePassProfileFailed);

                    function changePassProfileComplete(response){
                        return response.data;
                    }

                    function changePassProfileFailed(error) {
                        return error.data;
                    }
        }
        
        function changePassApprovalProfile(vm) {
            return $http.get(API + '/updatesecurity?ctx=1&clave1=firmanueva&clave2=pregunta&clave3=respuesta')
                        .then(changePassApprovalProfileComplete);
                        //.catch(changePassApprovalProfileFailed);

                    function changePassApprovalProfileComplete(response){
                        return response.data;
                    }

                    function changePassApprovalProfileFailed(error) {
                        return error.data;
                    }
        }
        
        function changeSecurityQuestionProfile(vm) {
            return $http.get(API + '/updatesecurity?ctx=0&clave1=Pregunta&clave2=respuesta&clave3=firma')
                        .then(changeSecurityQuestionProfileComplete);
                        //.catch(changeSecurityQuestionProfileFailed);

                    function changeSecurityQuestionProfileComplete(response){
                        return response.data;
                    }

                    function changeSecurityQuestionProfileFailed(error) {
                        return error.data;
                    }
        }
        
        
        //services
        function getServices() {
            return $http.get(API + '/service')
             .then(getServicesComplete);
             //.catch(getServicesFailed);

	         function getServicesComplete(response) {
	             return response.data;
	         }
	
	         function getServicesFailed(error) {
	             console.log("Failed to get services" + error.data);
	             return error.data;
	         }
        }
        
        function getMenuFile(){
            return $http.get(API + '/file')
                        .then(getMenuFileComplete);
                        //.catch(getMenuFileFailed);

                    function getMenuFileComplete(response){
                        return response.data;
                    }

                    function getMenuFileFailed(error) {
                        return error.data;
                    }
        }
        
        function getMenuReport(){
            return $http.get(API + '/report')
                        .then(getMenuReportComplete);
                        //.catch(getMenuReportFailed);

                    function getMenuReportComplete(response){
                        return response.data;
                    }

                    function getMenuReportFailed(error) {
                        return error.data;
                    }
        }
        
        function getEmails(){
            return $http.get(API + '/email')
                        .then(getEmailsComplete);
                        //.catch(getEmailsFailed);

                    function getEmailsComplete(response){
                        return response.data;
                    }

                    function getEmailsFailed(error) {
                        return error.data;
                    }
        }        
        
        function getMessageError(key) {
        	var obj = {
        		"1":"An error has ocurred and the Web Master has been notified. Try again later.",
        		"2":"Please enter your user id.",
        		"3":"Please enter your password.",
        		"4":"Please enter your space.",
        		"5":"User Id must have four (4) or more characters.",
        		"6":"Password must have four (4) or more characters.",
        		"7":"User id cannot start with a number or blank space, have special characters or quotation marks.",
        		"8":"Password cannot start with a number or blank space, have special characters or quotation marks.",
        		"9":"User id cannot start with a number or blank space, have special characters or quotation marks.",
        		"10":"Password cannot start with a number or blank space, have special characters or quotation marks.",
        		"11":"Please enter your first and last name.",
        		"12":"New password and its confirmation do not match.",
        		"10030":"Database transaction could not be initiated during security verification. Notify the solution master.",
        		"10060":"Session information could not be accessed during security verification. Notify the solution master.",
        		"10080":"Session information could not be updated during security verification. Notify the solution master.",
        		"10100":"License information could not be accessed during security verification. Notify the solution master.",
        		"10110":"License information could not be updated during security verification. Notify the solution master.",
        		"10120":"Licensed space definition does not match registry entry. Notify the solution master.",
        		"10130":"Maximum number of named users allowed has been exceeded. Notify the solution master.",
        		"10140":"Current licensing type is not supported. Notify the solution master.",
        		"10200":"Maximum number of concurrent users allowed has been exceeded. Try again later. If the problem persists, notify the solution master.",
        		"10300":"Your license has expired",
        		"11000":"Necessary information to store the document in the current process context has not been found. Check the design or the workflow database.",
        		"11010":"Workflow instance has not been stored in database. Check workflow data base.",
        		"11015":"Process instance has not been updated in data base. Check workflow data base.",
        		"11030":"Invalid logic expression has been detected during action processing. Check process design.",
        		"11040":"No recipients where found for role, work load or group connection.",
        		"11050":"No recipients where found for hierchachy or boss connection.",
        		"11060":"No subordinated recipients.",
        		"11070":"No recipients where found for pre-selection connection.",
        		"11080":"Final role for the collector does not match the result of the connection method.",
        		"11090":"Action cannot be performed due to a business rule validation defined for this process. Check data.",
        		"11100":"An specific field in partial dependence does not exist in current document. Check process design.",
        		"11101":"Dependency processing registry could not be executed. Check workflow data base.",
        		"11120":"Recipients needed to complete coordination action have not been assigned.",
        		"11130":"An error has ocurred during agents definition load. Check log file for more details.",
        		"11140":"Email and/or answer do not match the previously registered. Try again.",
        		"11145":"Approval key does not match register. Try again.",
        		"11150":"Read only document. No action can be performed.",
        		"11160":"Action to perform cannot be done without a selected instance.",
        		"11170":"Current instance is not recommended to perform requested coordination action. Check design.",
        		"11200":"Database transaction could not be initiated during coordination action processing. Try again later or notify solution master if the problem persists.",
        		"11210":"Coordination action could not be completed. Check log file for more details.",
        		"11220":"Business rule or tool execution has failed. Check log file for more details.",
        		"11225":"Tool path not defined. Ask your solution master to check for centralized information or designed tool definition.",
        		"11230":"Waiting status for the current document could not be released in a collector near the process",
        		"11240":"SQL query has failed or it has a wrong definition. Check log file for more detail and/or review design.",
        		"11250":"Agent type or call context not supported.",
        		"11260":"Recipient not found for reject action.",
        		"11270":"Reject action could not be performed from the collector.",
        		"11280":"The document cannot be acquired while being opened by another user",
        		"11290":"A commitment cannot be reassigned if there is an open one.",
        		"11430":"An error has ocurred during business rule processing while saving. Check log file for more details.",
        		"11440":"You have no available processes to initiate workflow.",
        		"11450":"Business rule implemented as COM service could not be executed. Check log file for more details.",
        		"11460":"You have accessed a -view- not granted for your profile. Check your registration with the solution master.",
        		"11500":"Document instance can only be acquired if the document is in transit and pending, not waiting for others, and only if it was opened from a view.",
        		"11420":"Internal process generation problem. It's easy to solve, talk to your solution master to fix it..",
        		"12000":"Problems sending email.",
        		"15011":"Number of concurrent users has been exceeded. This session has been enabled to continue.",
        		"15020":"There is a problem connecting to the database. Notify the solution master.",
        		"15021":"The user code cannot start with numbers.",
        		"15022":"There is no space to access. Notify the solution master",
        		"15023":"Invalid user id and/or password. Please try again.",
        		"15030":"You are not assigned to a role. Notify solution master.",
        		"15050":"Question and answer are not correctly registered. Notify the solution master.",
        		"15060":"Invalid approval key to change question and answer. Try again.",
        		"15070":"Invalid answer to question for approval key change. Try again.",
        		"15090":"Corrupted question and answer register. Specify a new question and answer in customize settings or notify solution master.",
        		"15140":"You already have an established connection. What do you want to do with your previous session?",
        		"15150":"This user has a transaction in progress. Try later",
        		"15160":"Non available information in order to execute pool conection. Notify solution master.",
        		"15200":"Your session has been canceled.",
        		"15220":"Session role has been replaced by another one.",
        		"15300":"The password has expired. You must change it to continue.",
        		"15305":"The password is going to expire soon. To change it, click on Personalize, and then in the option Change Password",
        		"15310":"The password has a smaller length that the allowed one.",
        		"15320":"The question and answer have expired. You must change it to be able to continue.",
        		"15321":"Please enter your security information and then click Submit",	
        		"15325":"This account has been blocked. Contact the solution master.",
        		"15330":"Your password has been assigned by email. You must specify email and answer again.",
        		"15335":"The password must contain at least one number.",
        		"15340":"The password must contain at least one special character.",
        		"15345":"The password must contain at least one lowercase letter.",
        		"15350":"The password must contain at least one uppercase letter.",
        		"15355":"The password has already been used.",
        		"15360":"Is not yet the minimum time to change the password.",
        		"15365":"The user account is locked by maximum number of failed login attempts.",	
        		"15400":"Security specification changed, requirements not fulfilled.",
        		"17000":"Process Server could not take work block.",
        		"17060":"Necessary component to load work not found.",
        		"17070":"An operation over a work has been intended while its not opened or created.",
        		"17080":"Instance number could not be generated.",
        		"17100":"Workhas been canceled.",
        		"17110":"No physical directories for attachments are defined. Notify solution master.",	
        		"17140":"Attachment requires a description.",
        		"17170":"Resultant file of attaching a binary data could not be saved.",
        		"17180":"Referenced field in business rule is not defined in current context. Check design.",
        		"17200":"Could not open document. Check log file for more details.",
        		"17350":"Document or base instance number could not be generated.",
        		"17360":"You must fulfill listed fields in order to perform action.",
        		"17400":"Document Data XML could not be processed.",
        		"17500":"Document status could not be changed to ended status.",
        		"18010":"Sintax Matrix bad constructed.",
        		"18050":"There is an assigned value in an application in a format that is not supported . Notify the solution master to solve the situation",
        		"19600":"Database error. Check log file for more details.",
        		"19700":"Format error in a solution file (XML). Notify the solution master to check log file for more details.",
        		"19800":"You have no permission to perform this action.",
        		"20000":"Unexpected internal exception. Check log file for more details.",
        		"70010":"We have sent you an e-mail message with your password.",
        		"70020":"Problems on agent execution.",
        		"70030":"Error could not be found.",
        		"70040":"You have no active session.",
        		"70050":"Problems during advance.",
        		"70060":"Operation has ended successfully.",
        		"70070":"Empty value list.",
        		"70080":"Your license will expire in "
        	};
        	return obj[key];
        }
    }


})();
