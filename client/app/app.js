var app = angular.module( 'modernnights', [
  'ngRoute',
  'modernnights.home',
  'modernnights.census',
  'modernnights.auth',
  'modernnights.services',
  'modernnights.directive',
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
  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push( 'AttachTokens' );

})
.factory( 'AttachTokens', function( $window ) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
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
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on( '$routeChangeStart', function( evt, next, current ) {
    if ( next.$$route && next.$$route.authenticate && !Auth.isAuth() ) {
      $location.path( '/signin' );
    }
  });
});
