angular.module('MyApp')
  .controller('SearchController', function($scope, $sessionStorage,
    $localStorage, OrderService, $ionicPopup, $state, $ionicHistory,
    $ionicLoading) {
    $scope.packageType = $localStorage.get('packageType');
    $scope.deliveryType = $localStorage.get('deliveryType');

    var packageInfo = $localStorage.getObject('packageInfo');
    $scope.recipientName = packageInfo.recipientName;
    $scope.recipientContact = packageInfo.recipientContact;
    $scope.remarks = packageInfo.remarks || '';
    $scope.weight = packageInfo.weight;
    $scope.pickUpTime = packageInfo.pickUpTime;

    var deliveryInfo = $localStorage.getObject('deliveryInfo');
    $scope.from = deliveryInfo.from;
    $scope.to = deliveryInfo.to;
    $scope.fare = deliveryInfo.fare;
    $scope.promocode = deliveryInfo.promocode || '';
    $scope.payment = deliveryInfo.payment;

    var user = $localStorage.getObject('user');

    function getPackageType() {
      if ($scope.packageType === 'document') {
        return 0;
      } else if ($scope.packageType === 'small') {
        return 1;
      } else if ($scope.packageType === 'medium') {
        return 2;
      } else if ($scope.packageType === 'large') {
        return 3;
      }
    }

    var preparedOrder = {
      created_by: user.userid,
      contactName: user.name,
      contactNumber: user.phone,
      orderType: getPackageType(),
      amount: $scope.fare,
      fromAddress: {
        geoLocation: {
          lat: $scope.from.geoLocation.lat,
          lng: $scope.from.geoLocation.lng
        },
        postal: $scope.from.postal,
        street: $scope.from.street,
        extra: $scope.from.extra
      },
      toAddress: {
        geoLocation: {
          lat: $scope.to.geoLocation.lat,
          lng: $scope.to.geoLocation.lng
        },
        postal: $scope.to.postal,
        street: $scope.to.street,
        extra: $scope.to.extra
      },
      location: {
        type: 'Point',
        coordinates: [$scope.from.geoLocation.lng, $scope.from.geoLocation.lat] // [lng, lat]
      },
      recipientName: $scope.recipientName,
      recipientContact: $scope.recipientContact,
      comments: $scope.remarks
    };

    $scope.sendRequest = function() {
      $ionicLoading.show({
        template: 'Creating order...'
      });
      OrderService.createOrder(preparedOrder)
        .success(function(data) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: 'Thank you for your order.<br/>You will be notified when the order is being delivered.'
          });

          alertPopup.then(function() {
            $ionicHistory.nextViewOptions({
              disableBack: true,
              disableAnimate: true,
              historyRoot: true
            });
            $localStorage.remove('packageType');
            $localStorage.remove('deliveryType');
            $localStorage.remove('deliveryInfo');
            $localStorage.remove('packageInfo');
            $state.go('app.home');
          });
        })
        .error(function(err) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Oops',
            template: 'Something seems wrong, please try again later.'
          });

          alertPopup.then();
        });
    };

    $scope.cancelOrder = function() {
      $ionicPopup.show({
        template: 'Cancel the order now?',
        title: 'Cancel Order',
        buttons: [{
          text: 'No'
        }, {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: function(e) {
            $ionicHistory.nextViewOptions({
              disableBack: true,
              disableAnimate: true,
              historyRoot: true
            });
            $localStorage.remove('packageType');
            $localStorage.remove('deliveryType');
            $localStorage.remove('deliveryInfo');
            $localStorage.remove('packageInfo');
            $state.go('app.home');
          }
        }]
      });
    };

  });
