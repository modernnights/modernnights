angular.module( 'modernnights.census', [] )

.controller( 'CensusController', function( Character, $scope ) {
  Character.getAll()
  .then( function( characters ) {
    $scope.characters = characters;
  });
});
