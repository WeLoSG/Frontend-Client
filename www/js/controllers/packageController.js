'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:PackageController
 * @description
 * # PackageController
 */
angular.module('MyApp')
  .controller('PackageController', function($scope, $state, $ionicHistory) {
  	$scope.goToDetailPage = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      $state.go('app.detail');
    };
  });
