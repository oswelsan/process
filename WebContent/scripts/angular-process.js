(function(){
    'use strict';

    angular
    .module('ngProcess', []);
    
    angular
        .module('ngProcess')
        .constant('API', ' http://131.255.104.36:9092/process/api')
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
            //$tasks
            getTasks: getTasks,
            getProfile: getProfile,
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
        function getProfile(id) {
            return $http.get(API + '/profile' + '/' + id)
             .then(getProfileComplete);
             //.catch(getProfileFailed);

         function getProfileComplete(response) {
             console.log("Encontrado Process");
             return response.data;
         }

         function getProfileFailed(error) {
             console.log("Failed to get profile" + error.data);
         }
        }
    }


})();
