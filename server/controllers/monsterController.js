const Monster = require( '../models' ).Monster;

module.exports = {

  getMonsters: function( req, res ) {
    Monster.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No monsters found' );
        return null;
      }
      res.json( data );
    }, function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getMonsterById: function( req, res ) {
    var id = parseInt( req.params.id );
    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'Invalid id' );
      return null;
    }
    Monster.findById( id )
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'No monster found by that ID' );
        return null;
      }
      res.json( data );
    }, function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    })
  }

}