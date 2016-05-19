var app = angular.module( 'modernnights', [
  'ngRoute',
  'modernnights.auth',
  'modernnights.census',
  'modernnights.chargen',
  'modernnights.connect',
  'modernnights.directive',
  'modernnights.home',
  'modernnights.roster',
  'modernnights.services',
  ])

.config( function ( $routeProvider, $httpProvider ) {
  $routeProvider
  .when( '/signin', {
    templateUrl: 'app/auth/signin.html',
    controller: 'AuthController',
  })
  .when( '/signup', {
    templateUrl: 'app/auth/signup.html',
    controller: 'AuthController',
  })
  .when( '/home', {
    templateUrl: 'app/home/home.html',
    controller: 'HomeController',
  })
  .when( '/census', {
    templateUrl: 'app/census/census.html',
    controller: 'CensusController',
    authenticate: true,
  })
  .when( '/roster', {
    templateUrl: 'app/roster/roster.html',
    controller: 'RosterController',
    authenticate: true,
  })
  .when( '/connect', {
    templateUrl: 'app/connect/connect.html',
    controller: 'ConnectController',
  })
  .when( '/chargen', {
    templateUrl: 'app/chargen/chargen.html',
    controller: 'ChargenController',
    authenticate: true,
  })
  .otherwise({
    redirectTo: '/home',
  })
  $httpProvider.interceptors.push( 'AttachTokens' );

})
.factory( 'AttachTokens', function( $window ) {
  var attach = {
    request: function( object ) {
      var jwt = $window.localStorage.getItem( 'com.modernnights' );
      if ( jwt ) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run( function( $rootScope, $location, Auth ) {
  $rootScope.$on( '$routeChangeStart', function( evt, next, current ) {
    if ( next.$$route && next.$$route.authenticate && !Auth.isAuth() ) {
      $location.path( '/signin' );
    }
  });
});
