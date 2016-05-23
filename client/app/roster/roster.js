angular.module( 'modernnights.roster', [] )

.controller( 'RosterController', function( Player, $scope ) {
  Player.getPlayerData()
  .then( function( data ) {
    $scope.player = data.username;
    $scope.characters = data.Characters;
  });

});