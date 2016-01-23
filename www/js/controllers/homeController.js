'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('MyApp')
  .controller('HomeController', function($scope, $state, $ionicHistory,
    $localStorage) {

    function setDeliveryTypeToImmediate() {
      $localStorage.set('deliveryType', 'immediate');
    }

    function setDeliveryTypeToExpress() {
      $localStorage.set('deliveryType', 'express');
    }

    $scope.goToPackagePage = function(deliveryType) {
      $localStorage.remove('packageType');
      $localStorage.remove('deliveryType');
      $localStorage.remove('deliveryInfo');
      $localStorage.remove('packageInfo');

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
