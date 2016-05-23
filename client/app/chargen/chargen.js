angular.module( 'modernnights.chargen', [] )

.controller( 'ChargenController', function( Character, $location, $scope ) {
  $scope.char = {};

  $scope.chargen = function( isValid ) {
    if ( isValid ) {
      Character.create( $scope.character )
      .then( function() {
        $location.path( '/roster' );
      })
      .catch( console.error );
    }
  }
});