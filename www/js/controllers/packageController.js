'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:PackageController
 * @description
 * # PackageController
 */
angular.module('MyApp')
  .controller('PackageController', function($scope, $state, $ionicHistory,
    $localStorage) {

    $scope.goToDetailPage = function(packageType) {
      if (packageType === 'document') {
        $localStorage.set('packageType', 'document');
      } else if (packageType === 'small') {
        $localStorage.set('packageType', 'small');
      } else if (packageType === 'medium') {
        $localStorage.set('packageType', 'medium');
      } else if (packageType === 'large') {
        $localStorage.set('packageType', 'large');
      } else {
        $localStorage.set('packageType', 'unknown');
      }

      $state.go('app.detail');
    };

    $scope.$on('$ionicView.enter', function() {
      $localStorage.remove('packageType');
      $localStorage.remove('deliveryInfo');
      $localStorage.remove('packageInfo');
    });
  });
