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
    var id = parseInt( req.params.id );

    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'That is not a valid id' );
      return null;
    }

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
      if( data.Pools.length === 0 ) {
        res.status( 404 ).send( 'No pools found' );
        return null;
      }
      res.send( data.Pools );
    }, function( err ) {
      console.log( err );
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getCharacterPool: function( req, res ) {
    var cid = req.params.cid;
    var pid = req.params.pid;

    if( Number.isNaN( cid ) ) {
      res.status( 400 ).send( 'That is not a valid character id' );
      return null;
    }
    if( Number.isNaN( pid ) ) { 
      res.status( 400 ).send( 'That is not a valid pool id' );
      return null;
    }

    Character.findOne({
      where: { id: cid },
      include: [{
        model: Pool,
        where: { id: pid },
        attributes: ['id', 'name', 'description'],
        through: {attributes: ['max', 'value']}
      }],
      attributes: []
    })
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'That pool does not exist' );
        return null;
      }
      res.send( data.Pools );
    }, function( err ) {
      console.log( err );
      res.status( 500 ).send( 'Internal server error' );
    })
  }

}