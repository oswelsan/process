	var myApp = angular.module('myApp',['ngAnimate', 'ui.bootstrap'])
	.directive('formElement', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				label : "@",
				model : "="
			},
			link: function(scope, element, attrs) {
				scope.disabled = attrs.hasOwnProperty('disabled');
				scope.required = attrs.hasOwnProperty('required');
				scope.pattern = attrs.pattern || '.*';
			},
			template: '<div class="form-group"><label class="col-sm-3 control-label no-padding-right" >'+
			          ' {{label}}</label><div class="col-sm-7"><span class="block input-icon input-icon-right" '+
			          'ng-transclude></span></div></div>'
		};
	})
	.controller('BaseLoginController',function($scope,$uibModal,$rootScope){
		$scope.user = {};
		$scope.isLoginUser = false;
		$scope.loginWindow = function(){
				var modalInstance = $uibModal.open({
				      animation: true,
				      templateUrl: 'login.html',
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
		
		$scope.doLogin = function (user) {
			$scope.buttonText = "Login...";
			// Once the user is authenticated then a message to be broadcast to another controller.
		    $rootScope.$broadcast('isLoginAction',user.username);
		 }
	
	})