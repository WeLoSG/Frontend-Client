'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:DetailController
 * @description
 * # DetailController
 */
angular.module('MyApp')
  .controller('DetailController', function($scope, $state, $ionicHistory) {
  	$scope.goToPreviousPage = function() {
      $ionicHistory.backView().go();
    };

    $scope.goToRoutePage = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      $state.go('app.route');
    };
  });
