'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:RouteController
 * @description
 * # RouteController
 */
angular.module('MyApp')
  .controller('RouteController', function($scope, $ionicLoading, socket,
    $sessionStorage, $ionicHistory, $state, MapService, $ionicPopup) {

    $scope.deliveryInfo = {
      from: '',
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
    }

    function initAutoComplete(map, id) {
      var input = document.getElementById(id);
      var options = {
        componentRestrictions: {
          country: 'SG'
        } //SG only
      };

      var autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo('bounds', map);

      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function(event) {
        marker.setVisible(false);

        // Get autocomplete address
        var place = autocomplete.getPlace();

        console.log(place.formatted_address);

        if (!place.geometry) {
          console.log(
            'Autocomplete\'s returned place contains no geometry');
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
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
        $scope.$apply(function() {
          if (id === 'from-address') {
            $scope.deliveryInfo.from = place.formatted_address;
          } else if (id === 'to-address') {
            $scope.deliveryInfo.to = place.formatted_address;
          }
        });
      });
    }

    function checkMissingField() {
      if ($scope.deliveryInfo.from === '') {
        return 'pick up place';
      } else if ($scope.deliveryInfo.to === '') {
        return 'destination';
      } else if ($scope.deliveryInfo.fare === '') {
        return 'est. fare';
      } else if ($scope.deliveryInfo.payment === '') {
        return 'payment mode';
      } else {
        return '';
      }
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

    $scope.disableTap = function() {
      var container = document.getElementsByClassName('pac-container');
      // disable ionic data tab
      angular.element(container).attr('data-tap-disabled', 'true');
      // leave input field if google-address-entry is selected
      angular.element(container).on('click', function() {
        document.getElementById('searchBar').blur();
      });
    };

    $scope.getAddressForFrom = function() {
      MapService.getLatLngFromPostcode($scope.map, $scope.deliveryInfo.from,
        MapService.getAddressFromLatLng);
      // Fill the input of from-address
    };

    $scope.getAddressForTo = function() {
      MapService.getLatLngFromPostcode($scope.map, $scope.deliveryInfo.from,
        MapService.getAddressFromLatLng);
      // Fill the input of to-address
    };

    $scope.goToSearchPage = function() {
      var validationResult = checkMissingField();

      if (validationResult == '') {
        $scope.deliveryInfo.from = document.getElementById('from-address').value;
        $scope.deliveryInfo.to = document.getElementById('to-address').value;

        $sessionStorage.setObject('deliveryInfo', this.deliveryInfo);
        $state.go('app.search');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing Field!',
          template: 'You have to enter the ' + validationResult + '!'
        });
        alertPopup.then(function(res) {

        });
      }

    };

    // Socket
    socket.on('connect', function() {
      console.log('connected');
    });
  });
