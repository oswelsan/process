	
	myApp.controller('BaseLoginController',function($scope,$uibModal,$rootScope){
		$scope.isLoginUser = false;
		$scope.loginWindow = function(){
				var modalInstance = $uibModal.open({
				      animation: true,
				      templateUrl: 'pages/login/login.html',
				      controller:'LoginCtrl',
				      backdrop: "static",
				    });
		}
		$scope.logoutWindow = function(){
			$scope.isLoginUser = false;
		}
		// here is a message listener that lister isLoginAction
	    $rootScope.$on('isLoginAction',function(event,username){
			$scope.isLoginUser = true;
			$scope.loginUserName = username;
		})
	
	});
	
	myApp.controller('LoginCtrl',function($scope,$uibModalInstance,$rootScope){
	$scope.user = {};
	$scope.buttonText = "Login";
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	   
	  };
	
	$scope.doLogin = function (user) {
		$scope.buttonText = "Login...";
		// Once the user is authenticated then a message to be broadcast to another controller.
	    $rootScope.$broadcast('isLoginAction',user.username);
	    $uibModalInstance.close();
	 };
	});