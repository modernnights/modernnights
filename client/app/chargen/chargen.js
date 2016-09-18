angular.module( 'modernnights.chargen', [] )

.controller( 'ChargenController', function( Character, Stat, $location, $scope ) {
  $scope.char = {};
  
  var getAttributes = function(){
    Stat.getStatByType( 'attributes' )
    .then( function( data ){
      $scope.attributes = data; 
    });
  };
  getAttributes();
  
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
