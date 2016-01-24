'use strict';

angular.module('MyApp')
  // use factory for services
  .factory('OrderService', function(ApiService, $http, $localStorage) {
    var token = $localStorage.get('token');
    var createOrder = function(order) {
      return $http({
        url: ApiService.getEndpoint() + '/orders/',
        params: {
          welo_token: token
        },
        data: {
          order: order
        },
        method: 'POST'
      });
    };

    var getOrders = function() {
      return $http({
        url: ApiService.getEndpoint() + '/orders/client',
        params: {
          welo_token: token
        },
        method: 'GET'
      });
    };

    var getStatus = function(statusId) {
      if (statusId === 1) {
        return 'To pick up';
      } else if (statusId === 2) {
        return 'On delivery';
      } else if (statusId === 3) {
        return 'Delivered';
      } else if (statusId === 4) {
        return 'Completed';
      } else {
        return 'Pending';
      }
    };

    var getOrderType = function(orderType) {
      if (orderType === 0) {
        return 'Document';
      } else if (orderType === 1) {
        return 'Small Parcel';
      } else if (orderType === 2) {
        return 'Medium Parcel';
      } else if (orderType === 3) {
        return 'Large Parcel';
      }
    };

    var getPackageTypeName = function(type) {
      if (type === 'document') {
        return 'Document';
      } else if (type === 'small') {
        return 'Small Parcel';
      } else if (type === 'medium') {
        return 'Medium Parcel';
      } else if (type === 'large') {
        return 'Large Parcel';
      }
    };

    var getDeliveryTypeName = function(type) {
      if (type === 'immediate') {
        return 'Immediate Delivery';
      } else if (type === 'express') {
        return 'Express Delivery';
      }
    };

    // public api
    return {
      getStatus: getStatus,
      getOrderType: getOrderType,
      createOrder: createOrder,
      getPackageTypeName: getPackageTypeName,
      getDeliveryTypeName: getDeliveryTypeName,
      getOrders: getOrders
    };

  });
