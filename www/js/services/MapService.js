'use strict';

/**
 * @ngdoc function
 * @name MyApp.service:MapService
 * @description
 * # MapService
 */
angular.module('MyApp')
	.factory('MapService', function($window) {

		return {
			getLatLngFromPostcode: function(map, postcode, getAddressFromLatLng) {
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					'address': postcode
				}, function postcodesearch(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var lat = results[0].geometry.location.lat();
						var lng = results[0].geometry.location.lng();

						var latLng = {
							lat: lat,
							lng: lng
						};

						getAddressFromLatLng(map, latLng);
					} else {
						alert("Error");
					}
				});

			},

			getAddressFromLatLng: function(map, position) {
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					latLng: position,
					region: 'sg'
				}, function(results, status) {
					console.log(results);
					if (status === google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							map.setZoom(16);
							map.setCenter(position);
							var marker = new google.maps.Marker({
								position: position,
								map: map
							});
							// infowindow.setContent(results[1].formatted_address);
							// infowindow.open(map, marker);
						} else {
							window.alert('No results found');
						}
					} else {
						window.alert('Geocoder failed due to: ' + status);
					}
				});
			},

			showMap: function(lat, lng) {
				latLng = new google.maps.LatLng(lat, lng);

				map.setCenter(latLng);

				marker = new google.maps.Marker({
					position: latLng,
					map: map,
					draggable: true,
					animation: google.maps.Animation.DROP
				});

				google.maps.event.addListener(marker, 'dragend', function(e) {
					var point = marker.getPosition();
					map.panTo(point);
					geocode(point);
				});
			}
		};
	});
