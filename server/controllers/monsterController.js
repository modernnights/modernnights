const Monster = require( '../models' ).Monster;

module.exports = {

  getMonsters: function( req, res ) {
    Monster.findAll()
    .then( function( data ) {
      res.json( data );
    }, function( err ) {
      res.status( 404 ).send( 'Monsters not found' );
    });
  }

}