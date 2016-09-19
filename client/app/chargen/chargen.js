angular.module( 'modernnights.chargen', [] )

.controller( 'ChargenController', function( Character, Stat, $location, $scope ) {
  $scope.character = {};
  
  var getArchetypes = function(){
    Stat.getArchetypes()
    .then( function( data ){
      $scope.archetypes = data;
    });
  };
  
  var getAttributes = function(){
    Stat.getStatsByType( 'mental' )
    .then( function( data ){
      $scope.mentalattributes = data; 
    });
    
    Stat.getStatsByType( 'social' )
    .then( function( data ){
      $scope.socialattributes = data;
    });
    
    Stat.getStatsByType( 'physical' )
    .then( function( data ){
      $scope.physicalattributes = data;
    });
  };
  
  getArchetypes();
  getAttributes();
  $scope.standardtrait = [5, 4, 3, 2, 1];
  
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
