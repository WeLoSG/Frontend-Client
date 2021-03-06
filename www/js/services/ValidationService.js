'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:ValidationService
 * @description
 * # ValidationService
 */
angular.module('MyApp')
  // use factory for services
  .factory('ValidationService', function($ionicPopup) {

    var isEmpty = function(val) {
      if (val == '' || val == null) {
        return true;
      } else {
        return false;
      }
    };

    var isEmail = function(val) {
      var re = /\S+@\S+\.\S+/;
      return re.test(val);
    };

    var isEqual = function(val_1, var_2) {
      return val_1 === var_2;
    }

    
    var popUpAlert = function(title, content) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: content
      });
      alertPopup.then(function(res) {

      });
    };

    // public api
    return {
      isEmpty: isEmpty,
      isEmail: isEmail,
      isEqual: isEqual,
      popUpAlert: popUpAlert
    };

  });