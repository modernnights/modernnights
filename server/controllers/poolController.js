const Pool = require( '../models' ).Pool;
const CharacterPool = require( '../models' ).CharacterPool;
const Character = require( '../models' ).Character;

module.exports = {

  getPools: function( req, res ) {
    Pool.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No pools found' );
        return null;
      }
      res.json( data );
    }, function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getCharacterPools: function( req, res ) {
    var id = req.params.id;

    Character.findOne({
      where: { id },
      include: [{ 
        model: Pool,
        attributes: ['id', 'name', 'description'],
        through: {attributes: ['max', 'value']}
      }],
      attributes: []
    })
    .then( function( data ) {
      res.send( data.Pools );
    }, function( err ) {
      console.log( err );
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getCharacterPool: function( req, res ) {}

}