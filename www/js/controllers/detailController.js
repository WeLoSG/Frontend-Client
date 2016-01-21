'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DetailController
 * @description
 * # DetailController
 */
angular.module('MyApp')
  .controller('DetailController', function($scope, $state, $ionicHistory,
    $sessionStorage) {

    this.packageInfo = {
      recipientName: '',
      recipientContact: '',
      remarks: '',
      weight: '',
      pickUpTime: ''
    };

    $scope.packageType = ' ' + $sessionStorage.get('packageType') +
      ' package';

    $scope.goToRoutePage = function() {
      $sessionStorage.setObject('packageInfo', this.packageInfo);
      $state.go('app.route');
    };
  });
