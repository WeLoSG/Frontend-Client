'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DetailController
 * @description
 * # DetailController
 */
angular.module('MyApp')
  .controller('DetailController', function($scope, $state, $ionicHistory,
    $sessionStorage, $ionicPopup) {

    $scope.packageInfo = {
      recipientName: '',
      recipientContact: '',
      remarks: '',
      weight: '',
      pickUpTime: ''
    };

    $scope.packageType = ' ' + $sessionStorage.get('packageType') +
      ' package';

    function checkMissingField() {
      if ($scope.packageInfo.recipientName == '') {
        return 'recipient name';
      } else if ($scope.packageInfo.recipientContact == '') {
        return 'recipient contact';
      } else if ($scope.packageInfo.weight == '') {
        return 'weight';
      } else if ($scope.packageInfo.pickUpTime == '') {
        return 'pick up time';
      } else {
        return '';
      } 
    }

    $scope.goToRoutePage = function() {
      var validationResult = checkMissingField();
      if (validationResult == '') {
        $sessionStorage.setObject('packageInfo', this.packageInfo);
        $state.go('app.route');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing Field!',
          template: 'You have to enter the ' + validationResult +'!'
        });
        alertPopup.then(function(res) {
          
        });
      }
    };
  });
