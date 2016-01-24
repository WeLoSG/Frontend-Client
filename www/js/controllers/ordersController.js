'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:OrdersController
 * @description
 * # OrdersController
 */
angular.module('MyApp')
  .controller('OrdersController', function($scope, $state, $ionicLoading, $localStorage, $ionicHistory, OrderService, ValidationService) {
    // do something with $scope
    $scope.getOrders = function() {
      OrderService.getOrders()
        .success(function(data) {
          $ionicLoading.hide();
          data.forEach(function(element) {
            element.currentStatus = OrderService.getStatus(element.status);
            element.category = OrderService.getOrderType(element.orderType);
          });
          $scope.orders = data;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function(error) {
          // display alert
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
          ValidationService.popUpAlert('Error', 'Please try again later!');
        });
    };

    $scope.$on('$ionicView.enter', function() {
      $ionicLoading.show({
	      template: 'Loading...'
	    });
	    $scope.getOrders();
    });

    $scope.goToOrderDetailPage = function(index) { 
      $localStorage.setObject('orderDetail', $scope.orders[index]);
      $localStorage.set('orderDetailIndex', index);
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: false,
        historyRoot: false
      });
      $state.go('app.orderDetail');
    };
  });
