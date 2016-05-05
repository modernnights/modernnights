const Character = require( '../models' ).Character;

module.exports = {

  getCharacters: function( req, res ) {
    Character.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No characters found' );
        return null;
      }
      res.json( data );
    },
    function( err ) {
      res.status( 500 ).send( 'Internal server errror' );
    });
  },

  getCharacterById: function( req, res ) {
    var id = parseInt( req.params.id );
    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'Invalid id' );
      return null;
    }
    Character.findById( id )
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'No characters found by that ID' );
        return null;
      }
      res.json( data );
    },
    function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  }

}