'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:AccountController
 * @description
 * # AccountController
 */
angular.module('MyApp')
  .controller('AccountController', function($scope, $localStorage, $ionicHistory, $state) {
    $scope.account = {
    	email: '',
    	name: '',
    	phone: '',
    	creditCard: '',
    	userid: ''
    }

    $scope.logout = function() {
    	$localStorage.remove('token');
    	$localStorage.remove('user');
    	$localStorage.remove('packageType');
    	$localStorage.remove('pacakgeInfo');
    	$localStorage.remove('deliveryType');
    	$localStorage.remove('deliveryInfo');

    	$ionicHistory.nextViewOptions({
	        historyRoot: true,
	        disableAnimate: true,
	        disableBack: true
	    });

	    $state.go('app.login');
    };

    $scope.$on('$ionicView.enter', function() {
      $scope.account = $localStorage.getObject('user');
    });
  });
