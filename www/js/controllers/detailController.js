'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DetailController
 * @description
 * # DetailController
 */
angular.module('MyApp')
  .controller('DetailController', function($scope, $state, $ionicHistory,
    $localStorage, $ionicPopup, ValidationService) {


    var defaultPackageInfo = {
      recipientName: '',
      recipientContact: '',
      remarks: '',
      weight: '',
      pickUpTime: ''
    };

    $scope.packageInfo = $localStorage.getObject('packageInfo',
      defaultPackageInfo);

    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.packageInfo = $localStorage.getObject('packageInfo',
        defaultPackageInfo);
    });

    $scope.packageType = ' ' + $localStorage.get('packageType') +
      ' package';

    function validateInfo() {
      if (ValidationService.isEmpty($scope.packageInfo.recipientName)) {
        return 'recipient name';
      } else if (ValidationService.isEmpty($scope.packageInfo.recipientContact)) {
        return 'recipient contact';
      } else if (ValidationService.isEmpty($scope.packageInfo.weight)) {
        return 'weight';
      } else if (ValidationService.isEmpty($scope.packageInfo.pickUpTime)) {
        return 'pick up time';
      } else {
        return '';
      }
    }

    $scope.goToRoutePage = function() {
      var validationResult = validateInfo();
      if (validationResult === '') {
        $localStorage.setObject('packageInfo', $scope.packageInfo);
        $state.go('app.route');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing Field!',
          template: 'You have to enter the ' + validationResult + '!'
        });
        alertPopup.then(function(res) {

        });
      }
    };

  });
