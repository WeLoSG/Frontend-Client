'use strict';

angular.module('MyApp')
  // use factory for services
  .factory('UserService', function(ApiService, $http, $timeout, $q) {

    var loginUser = function(email, password) {
      return $http({
        url: ApiService.getEndpoint() + '/users/login',
        data: {
          email: email,
          password: CryptoJS.SHA1(password).toString()
        },
        method: 'POST'
      });
    };

    // public api
    return {
      login: loginUser
    };

  });
