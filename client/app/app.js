var app = angular.module( 'modernnights', [
  'ngRoute',
  'modernnights.home',
  'modernnights.census',
  ])

.config( function ( $routeProvider, $httpProvider ) {
  $routeProvider
  .when( '/home', {
    templateUrl: 'app/home/home.html',
    controller: 'HomeController',
  })
  .when( '/census', {
    templateUrl: 'app/census/census.html',
    controller: 'CensusController',
  })
  .otherwise({
    redirectTo: '/home',
  })
});