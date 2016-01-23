'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:OrdersController
 * @description
 * # OrdersController
 */
angular.module('MyApp')
  .controller('OrdersController', function($scope, $ionicLoading, OrderService) {
    // do something with $scope
    function getStatus(statusId) {
      if (statusId === 1) {
        return 'To pick up';
      } else if (statusId === 2) {
        return 'On delivery';
      } else if (statusId === 3) {
        return 'Delivered';
      } else if (statusId === 4) {
        return 'Completed';
      }
    }

    function getOrderType(orderType) {
      if (orderType === 0) {
        return 'Document';
      } else if (orderType === 1) {
        return 'Small Parcel';
      } else if (orderType === 2) {
        return 'Medium Parcel';
      } else if (orderType === 3) {
        return 'Large Parcel';
      }
    }

    $scope.$on('$ionicView.enter', function() {
      $ionicLoading.show({
	      template: 'Loading...'
	    });
	    OrderService.getOrders()
	      .success(function(data) {
	        $ionicLoading.hide();
	        console.log(data);
	        data.forEach(function(element) {
	          element.currentStatus = getStatus(element.status);
	          element.category = getOrderType(element.orderType);
	        });
	        $scope.orders = data;
	      })
	      .error(function(error) {
	        // display alert
	        $ionicLoading.hide();
	        alert('an error occured', error);
	      });
	    });
  });
