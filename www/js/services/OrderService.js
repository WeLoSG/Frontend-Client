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

    // public api
    return {
      createOrder: createOrder
    };

  });