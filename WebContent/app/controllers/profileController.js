(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['processEngine', '$stateParams'];

    function ProfileController(processEngine, $stateParams) {
    	var vm = this;
        vm.title = 'Profile';
        vm.id = '1';
        vm.profile = [];

        activate();

        function activate() {
           getData();
        }

        function getData() {
            processEngine.getProfile(vm.id)
                .then(function (data) {
                    vm.profile = data;
                    return vm.profile;
                });
        }

    }
    
})();