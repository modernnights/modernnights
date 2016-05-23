angular.module( 'modernnights.services', [] )

.factory( 'Player', function( $http ) {
  var getPlayerData = function() {
    return $http({
      method: 'GET',
      url: '/api/player'
    })
    .then( function( resp ) {
      console.log( resp );
      return resp.data;
    })
  }
  return {
    getPlayerData
  }
})

.factory( 'Character', function( $http ) {
  var create = function( char ) {
    return $http({
      method: 'POST',
      url: '/api/characters',
      data: char
    })
    .then( function( resp ) {
      return resp.data;
    })
  }

  return {
    create
  }
})

.factory( 'Auth', function( $http, $location, $window ) {

  /* Event system for signing in */
  var onSignInChangeAction;

  var onSignInChange = function( callback ) {
    onSignInChangeAction = callback;
  }

  var signInChange = function() {
    onSignInChangeAction();
  }
  /* end event system */


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
    .catch( function( err ) {
      console.error( err );
    } );
  };

  var signup = function( user ) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then( function( resp ) {
      if( resp.status !== 200 ) {
        return null;
      }
      return resp.data.token;
    })
    .then( function( token ) {
      if( token !== null ) {
        $window.localStorage.setItem( 'com.modernnights', token );
        signInChange();
      }
    })
    .catch( function( err ) {
      console.error( err );
    } );
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem( 'com.modernnights' );
  };

  var getUserName = function() {
    var data = {};
    data.token = $window.localStorage.getItem( 'com.modernnights' );
    if( data.token !== null ) {
      return $http({
        method: 'GET',
        url: '/api/whoami',
        data: data,
      }).then( function( username ) {
        return username.data;
      });
    } else {
      return new Promise( function( resolve, reject ) {
        resolve( null );
        reject( null );
      });
    }
  }

  var signout = function() {
    $window.localStorage.removeItem( 'com.modernnights' );
    signInChange();
    $location.path( '/signin' );
  };


  return {
    onSignInChange,
    signin,
    signup,
    isAuth,
    signout,
    getUserName,
  };
});
