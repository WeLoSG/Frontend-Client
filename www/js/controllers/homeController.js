'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('MyApp')
  .controller('HomeController', function($scope, $state, $ionicHistory,
    $sessionStorage) {

    function setDeliveryTypeToImmediate() {
      $sessionStorage.set('deliveryType', 'immediate');
    }

    function setDeliveryTypeToExpress() {
      $sessionStorage.set('deliveryType', 'express');
    }

    $scope.goToPackagePage = function(deliveryType) {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      if (deliveryType === 'immediate') {
        setDeliveryTypeToImmediate();
      } else {
        setDeliveryTypeToExpress();
      }

      $state.go('app.package');
    };
  });
