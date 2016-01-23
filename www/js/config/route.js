angular.module('MyApp')

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  // register $http interceptors, if any. e.g.
  // $httpProvider.interceptors.push('interceptor-name');

  // Application routing
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .state('app.login', {
      url: '/login',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/login.html',
          controller: 'LoginController'
        }
      }
    })
    .state('app.register', {
      url: '/register',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/register.html',
          controller: 'RegisterController'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/home.html',
          controller: 'HomeController'
        }
      }
    })
    // .state('app.home.tabs', {
    //   url: '/tabs',
    //   abstract: true,
    //   views: {
    //     'homeView@app.home': {
    //       templateUrl: 'templates/views/tabs.html'
    //     }
    //   }
    // })
    .state('app.package', {
      url: '/package',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/package.html',
          controller: 'PackageController'
        }
      }
    })
    .state('app.detail', {
      url: '/detail',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/detail.html',
          controller: 'DetailController'
        }
      }
    })
    .state('app.route', {
      url: '/route',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/route.html',
          controller: 'RouteController'
        }
      }
    })
    .state('app.search', {
      url: '/search',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/search.html',
          controller: 'SearchController'
        }
      }
    })
    .state('app.account', {
      url: '/account',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/account.html',
          controller: 'AccountController'
        }
      }
    })
    .state('app.orders', {
      url: '/orders',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/orders.html',
          controller: 'OrdersController'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/settings.html',
          controller: 'SettingsController'
        }
      }
    });

  // redirects to default route for undefined routes
  $urlRouterProvider.otherwise('/app/home');
});
