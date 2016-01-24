'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:LoginController
 * @description
 * # LoginController
 */
angular.module('MyApp')
  .controller('LoginController', function($scope, $state, $ionicHistory,
    $localStorage, UserService, ValidationService) {

    $scope.credential = {
      email: '',
      password: ''
    };

    $scope.userLogin = function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
        disableBack: true
      });

      var error_msg = '';
      if (!ValidationService.isEmail($scope.credential.email)) {
        error_msg = 'Please enter a valid email address!';
      } else if (ValidationService.isEmpty($scope.credential.password)) {
        error_msg = 'Please enter the password!';
      } else {
        error_msg = '';
      }

      if (error_msg === '') {
        UserService.login($scope.credential.email, $scope.credential.password)
          .success(function(data) {
            if (data.status === 'success') {
              $localStorage.set('token', data.welo_token);
              $localStorage.setObject('user', data.user);
              $state.go('app.home');
            } else {
              ValidationService.popUpAlert('Login Failed', data.message);
            }
          })
          .error(function(error) {
            ValidationService.popUpAlert('Login Error', 'Please try again later!');
          });
      } else {
        ValidationService.popUpAlert('Wrong Info', error_msg);
      }
    };
  });
