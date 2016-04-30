const Archetype = require( '../models' ).Archetype;

module.exports = {

  getArchetypes: function( req, res ) {
    Archetype.findAll()
    .then( function( data ) {
      res.json( data );
    },
    function( err ) {
      res.status( 404 ).send( 'Table not found' );
    });
  },

  getArchetypeById: function( req, res ) {
    var id = parseInt( req.params.id );
    Archetype.findById( id )
    .then( function( data ) {
      res.json( data );
    },
    function( err ) {
      res.status( 404 ).send( 'No archetype by that id' );
    });
  }
  
}