'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:RegisterController
 * @description
 * # RegisterController
 */
angular.module('MyApp')
  .controller('RegisterController', function($scope, $state, $ionicHistory,
    $localStorage, $ionicPopup, UserService, ValidationService) {
  		$scope.registration = {
  			email: '',
  			name: '',
  			password: '',
  			repassword: '',
  			contact: ''
  		};

  		$scope.userRegister = function() {
  			$ionicHistory.nextViewOptions({
		        historyRoot: true,
		        disableAnimate: true,
		        disableBack: true
		    });

		    var error_msg = '';

		    if (!ValidationService.isEmail($scope.registration.email)) {
		    	error_msg = 'Please enter a valid email address!';
		    } else if (ValidationService.isEmpty($scope.registration.name)) {
		    	error_msg = 'Please enter a valid name!';
		    } else if (ValidationService.isEmpty($scope.registration.password)) {
		    	error_msg = 'Please enter a password!';
		    } else if (ValidationService.isEmpty($scope.registration.repassword)) {
		    	error_msg = 'Please enter the password again!';
		    } else if (ValidationService.isEmpty($scope.registration.contact)) {
		    	error_msg = 'Please enter a valid contact number!';
		    } else if (!ValidationService.isEqual($scope.registration.password, $scope.registration.repassword)) {
		    	error_msg = 'Two passwords are not the same!'
		    }

		    if (error_msg === '') {
				UserService.register($scope.registration.email, $scope.registration.password, $scope.registration.name, $scope.registration.contact)
		        .success(function(data) {
		          if (data.status === 'success') {
		            $localStorage.set('token', data.welo_token);
		            $localStorage.setObject('user', data.user);
		            $state.go('app.home');
		          } else {
		            console.log('register failed');
		          }
		        })
		        .error(function(error) {
		          console.log(error);
		        });
			} else {
				var alertPopup = $ionicPopup.alert({
					title: 'Wrong Information!',
					template: error_msg
				});
				alertPopup.then(function(res) {

				});
			}
  		};
  });
