'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:OrderDetailController
 * @description
 * # OrderDetailController
 */
angular.module('MyApp')
  .controller('OrderDetailController', function($scope, $state, $localStorage, $ionicLoading, OrderService, ValidationService) {
    // do something with $scope
		$scope.selectedOrder = {};
		$scope.selectedIndex = -1;

		$scope.$on('$ionicView.enter', function() {
		  $scope.selectedOrder = $localStorage.getObject('orderDetail');
		  $scope.selectedIndex = $localStorage.get('orderDetailIndex', -1);
		  $scope.getOrder();
		});

		$scope.getOrder = function() {
			$ionicLoading.show({
	  	  template: 'Loading...'
	    });
		  OrderService.getOrders()
		    .success(function(data) {
		      data.forEach(function(element) {
		        element.currentStatus = OrderService.getStatus(element.status);
		        element.category = OrderService.getOrderType(element.orderType);
		      });
		      $scope.orders = data;
		      if ($scope.selectedIndex === -1) {
		    		$ionicLoading.hide();
		    		$scope.$broadcast('scroll.refreshComplete');
		    		ValidationService.popUpAlert('Index Error', 'Please try again later!');
		    	} else {
		    		$scope.selectedOrder = $scope.orders[$scope.selectedIndex];
		    		$ionicLoading.hide();
		    		$scope.$broadcast('scroll.refreshComplete');
		    	}
		    })
		    .error(function(error) {
		      // display alert
		      $ionicLoading.hide();
		    	$scope.$broadcast('scroll.refreshComplete');
		      ValidationService.popUpAlert('Connection Error', 'Please try again later!');
		    });
		};
  });
