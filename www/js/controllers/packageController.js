'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:PackageController
 * @description
 * # PackageController
 */
angular.module('MyApp')
  .controller('PackageController', function($scope, $state, $ionicHistory, $sessionStorage) {
  	$scope.goToDetailPage = function(packageType) {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      if (packageType == 'document') {
        $sessionStorage.set('packageType', 'document');
      } else if (packageType == 'small') {
        $sessionStorage.set('packageType', 'small');
      } else if (packageType == 'medium') {
        $sessionStorage.set('packageType', 'medium');
      } else if (packageType == 'large') {
        $sessionStorage.set('packageType', 'large');
      } else {
        $sessionStorage.set('packageType', 'unknown');
      }

      $state.go('app.detail');
    };
  });
