angular.module( 'modernnights.services', [] )

.factory( 'Auth', function( $http, $location, $window ) {

  var onSignInChangeAction;

  var onSignInChange = function( callback ) {
    onSignInChangeAction = callback;
  }

  var signInChange = function() {
    onSignInChangeAction();
  }

  var signin = function( user ) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then( function( resp ) {
      return resp.data.token;
    })
    .then( function( token ) {
      $window.localStorage.setItem( 'com.modernnights', token );
      signInChange();
    })
    .catch( console.error );
  };

  var signup = function( user ) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then( function( resp ) {
      return resp.data.token;
    })
    .then( function( token ) {
      $window.localStorage.setItem( 'com.modernnights', token );
      signInChange();
    })
    .catch( console.error );
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem( 'com.modernnights' );
  };

  var getUserName = function() {
    var data = {};
    data.token = $window.localStorage.getItem( 'com.modernnights' );
    return $http({
      method: 'POST',
      url: '/api/whoami',
      data: data,
    }).then( function( username ) {
      return username.data;
    });
  }

  var signout = function() {
    $window.localStorage.removeItem( 'com.modernnights' );
    signInChange();
    $location.path( '/signin' );
  };


  return {
    onSignInChange: onSignInChange,
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    getUserName: getUserName,
  };
});