'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:RouteController
 * @description
 * # RouteController
 */
angular.module('MyApp')
  .controller('RouteController', function($scope, $ionicLoading, socket,
    $sessionStorage, $ionicHistory, $state, MapService) {
    var markers = [];

    this.deliveryInfo = {
      from: 'haha',
      to: '',
      fare: '',
      promocode: '',
      payment: ''
    };

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

    function initAutoComplete(map, id) {
      var input = document.getElementById(id);
      var options = {
        componentRestrictions: {country: 'SG'}//Turkey only
      };

      var autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo('bounds', map);
      autocomplete.setTypes([]);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        });
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      });
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

      initAutoComplete(map, 'from-address');
      initAutoComplete(map, 'to-address');
    };

    $scope.getAddressForFrom = function() {
      // console.log(this.deliveryInfo.from);
      var result;
      MapService.getLatLngFromPostcode($scope.map, this.deliveryInfo.from, MapService.getAddressFromLatLng);
      // console.log(position);
      // MapService.getAddressFromLatLng(position);
    };

    $scope.getAddressForTo = function() {
      
    };

    $scope.goToPreviousPage = function() {
      console.log("haha");
      $ionicHistory.goBack();
    };

    $scope.goToSearchPage = function() {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });

      $sessionStorage.setObject('deliveryInfo', this.deliveryInfo);

      $state.go('app.search');
    };

    // Socket
    socket.on('connect', function() {
      console.log('connected');
    });
  });
