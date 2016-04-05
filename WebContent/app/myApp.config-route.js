(function () {
    'use strict';

    angular
        .module('myApp')
        .config(uiRouteProviders);

    function uiRouteProviders($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('root', {
            abstract: true,
            url: '/',
            views: {
                '': {
                	templateUrl: 'app/views/dashboard/main.html'
                }
            }
        })
        .state('root.main', {
            url: 'main',
            views: {
                'header@root': {
                	templateUrl: 'app/views/assets/header.html',
                	controller: 'MainController',
                    controllerAs: 'vm'
                },
                'sidebar@root': {
                	templateUrl: 'app/views/assets/sidebar.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                },
                'container@root':{
                    templateUrl: 'app/views/tasks.html',
                    controller: 'TasksController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('root.login', {
            url: '',
            views:{
                'login@root':{
                    templateUrl: 'app/views/login.html',
                    controller: 'SessionsController',
                    controllerAs: 'vm'
                }
            }
        }); 
      }


})();
