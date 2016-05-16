const Archetype = require( '../models' ).Archetype;

module.exports = {

  getArchetypes: function( req, res ) {
    Archetype.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No archetypes found' );
        return null;
      }
      res.json( data );
    },
    function( err ) {
      res.status( 500 ).send( 'Internal server errror' );
    });
  },

  getArchetypeById: function( req, res ) {
    var id = parseInt( req.params.id );
    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'Invalid id' );
      return null;
    }
    Archetype.findById( id )
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'No archetypes found by that ID' );
        return null;
      }
      res.json( data );
    },
    function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getArchetypeByName: function( req, res ) {},

}