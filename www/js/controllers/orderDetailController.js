'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:OrderDetailController
 * @description
 * # OrderDetailController
 */
angular.module('MyApp')
  .controller('OrderDetailController', function($scope, $state, $localStorage) {
    // do something with $scope
	$scope.selectedOrder = {};

	$scope.$on('$ionicView.enter', function() {
      $scope.selectedOrder = $localStorage.getObject('orderDetail');
    });
  });
