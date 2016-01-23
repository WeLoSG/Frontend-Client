'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:LocationService
 * @description
 * # LocationService
 */
angular.module('MyApp')
  // use factory for services
  .service('LocationService', function($http) {

    // return the address get from the postal code.
    /**
      Sample Usage:
        LocationService.getGeoDataForPostalCode('138607', function(data) {
          console.log(data);
        });
    **/
    var getGeoDataForPostalCode = function(postalCode, callback) {
      $http.jsonp('http://gothere.sg/maps/geo?callback=JSON_CALLBACK', {
        params: {
          'output': 'json',
          'q': postalCode,
          'client': '',
          'sensor': false
        }
      }).success(function(data) {
        console.log(data);
        if (data.Status.code === 200) {
          callback({
            code: 200,
            address: data.Placemark[0].AddressDetails.Country.Thoroughfare
              .ThoroughfareName,
            addressLine: data.Placemark[0].AddressDetails.Country.AddressLine, // (not all have) building, etc...
            geolocation: {
              lat: data.Placemark[0].Point.coordinates[1],
              lng: data.Placemark[0].Point.coordinates[0]
            }
          });
        } else {
          callback({
            code: 400
          });
        }
      }).error(function(error) {
        callback({
          code: 400
        });
      });
    };

    // // public api
    return {
      getGeoDataForPostalCode: getGeoDataForPostalCode
    };

  });
