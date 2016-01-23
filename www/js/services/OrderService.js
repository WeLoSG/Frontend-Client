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

    // public api
    return {
      createOrder: createOrder,
      getOrders: getOrders
    };

  });
