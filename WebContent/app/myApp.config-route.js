(function () {
    'use strict';

    angular
        .module('myApp')
        .config(uiRouteProviders);

    function uiRouteProviders($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {
                url: '',
                abstract: true,    
                views: {
                    '': {
                        templateUrl: 'app/views/dashboard/main.html',
                        controller: 'MainController',
                        controllerAs: 'vm'
                    },
                    'header@root':{
                        templateUrl: 'app/views/assets/header.html'
                    },
                    'sidebar@root':{
                        templateUrl: 'app/views/assets/sidebar.html'
                    },
                    'login@root':{
                        templateUrl: 'app/views/login.html'
                    }
                }
            })
            .state('root.tasks', {
                url: '/',
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
