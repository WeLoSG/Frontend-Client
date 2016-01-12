'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:RouteController
 * @description
 * # RouteController
 */
angular.module('MyApp')
  .controller('RouteController', function($scope, $ionicLoading, socket,
    $sessionStorage) {
    var markers = [];

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: $scope.map
      });

      // Add info window
      var infoWindow = new google.maps.InfoWindow({
        content: 'This is a new marker',
        noSupress: true
      });

      marker.addListener('click', function() {
        infoWindow.open($scope.map, marker);
      });
      markers.push(marker);
    }

    $scope.initMap = function(map) {
      $scope.map = map;

      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        template: 'Getting current location'
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        var myLocation = new google.maps.LatLng(pos.coords.latitude,
          pos.coords.longitude);
        console.log(myLocation.lat());
        console.log(myLocation.lng());
        $scope.map.setCenter({
          lat: myLocation.lat(),
          lng: myLocation.lng()
        });
        $scope.map.setZoom(14);

        addMarker(myLocation);

        var LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        $ionicLoading.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
    };

    // Socket
    socket.on('connect', function() {
      console.log('connected');
    });
  });
