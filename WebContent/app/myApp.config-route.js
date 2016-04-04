(function () {
    'use strict';

    angular
        .module('myApp')
        .config(uiRouteProviders);

    function uiRouteProviders($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
	        .state('root', {
	            url: '/',
	            views:{
	                '':{
	                    templateUrl: 'app/views/login.html',
	                    controller: 'SessionsController',
	                    controllerAs: 'vm'
	                }
	            }
	        })
            .state('root.main', {
                url: 'main',
                views: {
                    '': {
                        templateUrl: 'app/views/dashboard/main.html',
                        controller: 'MainController',
                        controllerAs: 'main'
                    },
                    'header@root.main':{
                        templateUrl: 'app/views/assets/header.html'
                    },
                    'sidebar@root':{
                        templateUrl: 'app/views/assets/sidebar.html'
                    }
                }
            })
            .state('root.tasks', {
                url: 'task',
                views:{
                    'container@root':{
                        templateUrl: 'app/views/tasks.html',
                        controller: 'TasksController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    filter: null
                }
            })
            .state('root.profile', {
                url: '/profile',
                views: {
                    'container@root': {
                        templateUrl: 'app/views/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm'
                    }
                }
            }); 

    }


})();
