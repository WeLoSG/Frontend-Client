angular.module('MyApp')
  .controller('SearchController', function($scope, $http) {
    // do something with $scope
    $scope.sendRequest = function() {
    	var parameter = JSON.stringify({/* JSON here */});
	    var url; // url here
	    $http.post(url, parameter)
	    	.success(function(data, status, headers, config) {
		        // this callback will be called asynchronously
		        // when the response is available
		        console.log(data);
	    	})
		    .error(function(data, status, headers, config) {
		        // called asynchronously if an error occurs
		        // or server returns response with an error status.
		    });
    };
  });