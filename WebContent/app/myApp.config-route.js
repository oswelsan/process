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
                	controller: 'SessionsController',
                    controllerAs: 'vm'
                },
                'container@root':{
                    templateUrl: 'app/views/tasks.html',
                    controller: 'TasksController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('root.main.service', {
            views: {
                'container@root':{
                    templateUrl: 'app/views/service.html',
                    controller: 'ServiceController',
                    controllerAs: 'vm'
                }
            }
        })        
        .state('root.login', {
            url: '',
            views:{
                'login@root':{
                    templateUrl: 'app/views/sessions/login.html',
                    controller: 'SessionsController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('root.login.recuperate', {
            views:{
                'login@root':{
                    templateUrl: 'app/views/sessions/recuperate.html',
                    controller: 'SessionsController',
                    controllerAs: 'vm'
                }
            }
        });         
      }


})();
