'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DetailController
 * @description
 * # DetailController
 */
angular.module('MyApp')
  .controller('DetailController', function($scope, $state, $ionicHistory, $sessionStorage) {
    this.packageInfo = {
      recipientName: '',
      recipientContact: '',
      remarks: '',
      weight: '',
      pickUpTime: ''
    };

    $scope.goToPreviousPage = function() {
      console.log("haha");
      $ionicHistory.backView().go();
    };

    $scope.goToRoutePage = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      $sessionStorage.setObject('packageInfo', this.packageInfo);

      $state.go('app.route');
    };
  });
