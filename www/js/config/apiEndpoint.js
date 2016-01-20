'use strict';

/**
 * @ngdoc constant
 * @name MyApp.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('MyApp')

// development
.constant('API_ENDPOINT', {
    host: 'http://localhost',
    port: 3000,
    path: '',
    needsAuth: false
  })
  .constant('GEO_POSTAL_ENDPOINT',
    'http://gothere.sg/maps/geo'
  )
  // .constant('GEO_POSTAL_ENDPOINT',
  //   'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyALKC1tljWTKklkQBusA89LXkcu5MxhW68&components=country:SG&address='
  // )
  .constant('GEO_PLACE_ENDPOINT',
    'https://maps.googleapis.com/maps/api/place/textsearch/json?&components=country:SG&key=AIzaSyALKC1tljWTKklkQBusA89LXkcu5MxhW68&query='
  );


// live example with HTTP Basic Auth
/*
.constant('API_ENDPOINT', {
  host: 'http://yourserver.com',
  path: '/api/v2',
  needsAuth: true,
  username: 'whatever',
  password: 'foobar'
});
*/
