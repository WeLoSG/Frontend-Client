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
    .state('app.home', {
      url: '/home',
      abstract: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('app.home.tabs', {
      url: '/tabs',
      abstract: true,
      views: {
        'homeView@app.home': {
          templateUrl: 'templates/views/tabs.html'
        }
      }
    })
    .state('app.home.tabs.package', {
      url: '/package',
      cache: true,
      views: {
        'packageTabView@app.home.tabs': {
          templateUrl: 'templates/views/package.html'
        }
      }
    })
    .state('app.home.tabs.route', {
      url: '/route',
      cache: true,
      views: {
        'routeTabView@app.home.tabs': {
          templateUrl: 'templates/views/route.html',
          controller: 'RouteController'
        }
      }
    })
    .state('app.home.tabs.search', {
      url: '/search',
      cache: true,
      views: {
        'searchTabView@app.home.tabs': {
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
  $urlRouterProvider.otherwise('/app/home/tabs/package');
});
