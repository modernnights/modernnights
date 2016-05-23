angular.module( 'modernnights.roster', [] )

.controller( 'RosterController', function( Player, $scope ) {
  Player.getPlayerData()
  .then( function( data ) {
    $scope.characters = data.Characters;
  });

});