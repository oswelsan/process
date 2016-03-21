var myApp = angular.module('myApp',['ngAnimate', 'ui.bootstrap']);
myApp.controller('LoginController',function($scope,$uibModal,$rootScope){
		$scope.user = {};
		$scope.showLoginUser = true;
		$scope.showWork = false;
		$scope.loginWindow = function(){
				var modalInstance = $uibModal.open({
				      animation: true,
				      templateUrl: 'login.html',
				      controller:'LoginCtrl',
				      backdrop: "static",
				    });
		}
		$scope.logoutWindow = function(){
			$scope.showLoginUser = true;
			$scope.showWork = false;
		}
		// here is a message listener that lister isLoginAction
	    $rootScope.$on('isLoginAction',function(event,username){
			$scope.showLoginUser = false;
			$scope.loginUserName = username;
			$scope.showWork = true;
		})
		
		$scope.doLogin = function (user) {
			$scope.buttonText = "Login...";
			// Once the user is authenticated then a message to be broadcast to another controller.
		    $rootScope.$broadcast('isLoginAction',user.username);
		 }
	    
	    $scope.data = {
	    	    availableOptions: [
	    	      {id: '1', name: 'Sql Server'},
	    	      {id: '2', name: 'Oracle Server'},
	    	      {id: '3', name: 'MySql Server'}
	    	    ],
	    	    selectedOption: {id: '1', name: 'Sql Server'}
	    	    };
	
	});