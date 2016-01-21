angular.module('MyApp')
  .controller('SearchController', function($scope, $sessionStorage, $http, ApiService) {
  	$scope.packageType = $sessionStorage.get('packageType', 'unknown');
  	$scope.deliveryType = $sessionStorage.get('deliveryType', 'unknown');

  	var packageInfo = $sessionStorage.getObject('packageInfo');
	$scope.recipientName = packageInfo.recipientName;
	$scope.recipientContact = packageInfo.recipientContact;
	$scope.remarks = packageInfo.remarks;
	$scope.weight = packageInfo.weight;
	$scope.pickUpTime = packageInfo.pickUpTime;

	var	deliveryInfo = $sessionStorage.getObject('deliveryInfo');
	$scope.from = deliveryInfo.from;
	$scope.to = deliveryInfo.to;
	$scope.fare = deliveryInfo.fare;
	$scope.promocode = deliveryInfo.promocode;
	$scope.payment = deliveryInfo.payment;

  	this.obj = {
		packageType: '',
		deliveryType: ''
	};

	
	this.obj.deliveryType = $sessionStorage.get('deliveryType', 'unknown');

    // do something with $scope
    $scope.sendRequest = function() {
    	var parameter = JSON.stringify(this.obj);
	    // var url; // url here
		$http({
			url: ApiService.getEndPoint(),
			method: 'GET'
		});
    };
  });