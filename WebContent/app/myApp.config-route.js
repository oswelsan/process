(function () {
    'use strict';

    angular
        .module('myApp')
        .config(uiRouteProviders);

    function uiRouteProviders($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('environments', {
                url: '/environments',
                views: {
                    '': {
                        templateUrl: 'app/views/environments.html',
                        controller: 'EnvironmentsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'app/views/sessions.html',
                        controller: 'SessionsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('login.environment', {
                url: '/:environmentName',
                views: {
                    '': {
                        templateUrl: 'app/views/sessions.html',
                        controller: 'SessionsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'app/views/dashboard/main.html',
                        controller: 'MainController',
                        controllerAs: 'mainCtrl'
                    },
                    'header@root':{
                        templateUrl: 'app/views/assets/header.html'
                    },
                    'sidebar@root':{
                        templateUrl: 'app/views/assets/sidebar.html'
                    }
                }
            })
            .state('root.environments', {
                url: '/',
                views: {
                    'container@root': {
                        templateUrl: 'app/views/environments.html',
                        controller: 'EnvironmentsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.login', {
                url: '/login',
                views: {
                    'container@root': {
                        templateUrl: 'app/views/sessions.html',
                        controller: 'SessionsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.tasks', {
                url: '/tasks',
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
            }); 

    }


})();
