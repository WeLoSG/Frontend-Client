'use strict';

/**
 * @ngdoc function
 * @name MyApp.controller:RouteController
 * @description
 * # RouteController
 */
angular.module('MyApp')
  .controller('RouteController', function($scope, $ionicLoading, socket,
    $localStorage, $ionicHistory, $state, LocationService,
    $ionicPopup) {

    $scope.deliveryInfo = {
      from: {},
      to: {},
      fare: '',
      promocode: '',
      payment: 'Credit Card'
    };

    var deliveryInfo = $localStorage.getObject('deliveryInfo');
    if (Object.keys(deliveryInfo).length !== 0) {
      $scope.deliveryInfo = deliveryInfo;
      $scope.isShowFromAddressDetail = true;
      $scope.isShowDeliverAddressDetail = true;
    }

    $scope.getAddressFromPostal = function(id) {
      var deliveryInfo;
      if (id === 'from') {
        deliveryInfo = $scope.deliveryInfo.from;
      } else {
        deliveryInfo = $scope.deliveryInfo.to;
      }
      var postalCode = deliveryInfo.postal;

      if (!postalCode || postalCode.toString().length !== 6) {
        if (id === 'from') {
          $scope.isShowFromAddressDetail = false;
        } else {
          $scope.isShowDeliverAddressDetail = false;
        }
      } else {
        $ionicLoading.show();
        LocationService.getGeoDataForPostalCode(postalCode, function(data) {
          if (data.code !== 200) {
            var alertPopup = $ionicPopup.alert({
              title: 'Wrong Postal Code',
              template: 'Please check your entered postal code.'
            });
            if (id === 'from') {
              $scope.isShowFromAddressDetail = false;
            } else {
              $scope.isShowDeliverAddressDetail = false;
            }
          } else {
            if (id === 'from') {
              $scope.isShowFromAddressDetail = true;
            } else {
              $scope.isShowDeliverAddressDetail = true;
            }
            deliveryInfo.street = data.address;
            deliveryInfo.geoLocation = data.geolocation;
            deliveryInfo.extra = '';
          }
          $ionicLoading.hide();
        });
      }
    };

    // function initAutoComplete(map, id) {
    //   var input = document.getElementById(id);
    //   var options = {
    //     componentRestrictions: {
    //       country: 'SG'
    //     } //SG only
    //   };
    //
    //   var autocomplete = new google.maps.places.Autocomplete(input, options);
    //   autocomplete.bindTo('bounds', map);
    //
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     anchorPoint: new google.maps.Point(0, -29)
    //   });
    //
    //   autocomplete.addListener('place_changed', function(event) {
    //     marker.setVisible(false);
    //
    //     // Get autocomplete address
    //     var place = autocomplete.getPlace();
    //
    //     console.log(place);
    //     console.log(place.geometry.location.lat());
    //     console.log(place.geometry.location.lng());
    //
    //     if (!place.geometry) {
    //       console.log(
    //         'Autocomplete\'s returned place contains no geometry');
    //       return;
    //     }
    //
    //     if (place.geometry.viewport) {
    //       map.fitBounds(place.geometry.viewport);
    //     } else {
    //       map.setCenter(place.geometry.location);
    //       map.setZoom(17);
    //     }
    //     marker.setIcon({
    //       url: place.icon,
    //       size: new google.maps.Size(71, 71),
    //       origin: new google.maps.Point(0, 0),
    //       anchor: new google.maps.Point(17, 34),
    //       scaledSize: new google.maps.Size(35, 35)
    //     });
    //     marker.setPosition(place.geometry.location);
    //     marker.setVisible(true);
    //     $scope.$apply(function() {
    //       if (id === 'from-address') {
    //         $scope.deliveryInfo.from.postal = place.address_components[
    //           0];
    //         $scope.deliveryInfo.from = place.formatted_address;
    //       } else if (id === 'to-address') {
    //         $scope.deliveryInfo.to = place.formatted_address;
    //       }
    //     });
    //   });
    // }

    function checkMissingField() {
      if (!$scope.deliveryInfo.from.postal || !$scope.deliveryInfo.from
        .street) {
        return 'pick up address';
      } else if (!$scope.deliveryInfo.to.postal || !$scope.deliveryInfo
        .to.street) {
        return 'destination';
      } else if (!$scope.deliveryInfo.fare) {
        return 'estimated fare';
      } else if (!$scope.deliveryInfo.payment) {
        return 'payment mode';
      } else {
        return '';
      }
    }

    // $scope.initMap = function(map) {
    //   $scope.map = map;
    //
    //   if (!$scope.map) {
    //     return;
    //   }
    //
    //   $scope.loading = $ionicLoading.show({
    //     template: 'Checking location...'
    //   });
    //
    //   navigator.geolocation.getCurrentPosition(function(pos) {
    //     var myLocation = new google.maps.LatLng(pos.coords.latitude,
    //       pos.coords.longitude);
    //     $scope.map.setCenter({
    //       lat: myLocation.lat(),
    //       lng: myLocation.lng()
    //     });
    //     $scope.map.setZoom(14);
    //
    //     var LatLng = {
    //       lat: pos.coords.latitude,
    //       lng: pos.coords.longitude
    //     };
    //
    //     $ionicLoading.hide();
    //   }, function(error) {
    //     console.log('Unable to get location: ' + error.message);
    //     $ionicLoading.hide();
    //   });
    //
    //   initAutoComplete(map, 'from-address');
    //   initAutoComplete(map, 'to-address');
    // };

    $scope.disableTap = function() {
      var container = document.getElementsByClassName('pac-container');
      // disable ionic data tab
      angular.element(container).attr('data-tap-disabled', 'true');
      // leave input field if google-address-entry is selected
      angular.element(container).on('click', function() {
        document.getElementById('searchBar').blur();
      });
    };

    $scope.goToSearchPage = function() {
      var validationResult = checkMissingField();

      if (validationResult === '') {
        $localStorage.setObject('deliveryInfo', $scope.deliveryInfo);
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
