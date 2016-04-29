var app = angular.module( 'modernnights', [
  'ngRoute',
  'modernnights.home',
  ])

.config( function ( $routeProvider, $httpProvider ) {
  $routeProvider
  .when( '/home', {
    templateUrl: 'app/home/home.html',
    controller: 'HomeController',
  })
  .otherwise({
    redirectTo: '/home',
  })
});