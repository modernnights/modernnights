const StatType = require( '../models' ).StatType;
const Stat = require( '../models' ).Stat;

module.exports = {

  getStats: function( req, res ) {
    Stat.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No stats found' );
        return null;
      }
      res.json( data );
    }, function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getStatById: function( req, res ) {
    //TOOD: Find by ID or Name
    var id = parseInt( req.params.id );
    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'Invalid id' );
      return null;
    }
    Stat.findById( id )
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'No stat found by that ID' );
        return null;
      }
      res.json( data );
    }, function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  },

  getStatsByType: function( req, res ) {
    //TODO: Find by ID or Name
    //TODO: Handle hierarchy in StatTypes
    var id = parseInt( req.params.id );
    if( Number.isNaN( id ) ) {
      res.status( 400 ).send( 'Invalid id' );
      return null;
    }
    Stat.findAll( { include: [ { model: StatType, where: { id } } ] } )
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No stats found with that type' );
        return null;
      }
      res.json( data );
    }, function( err ) {
      res.status( 500 ).send( 'Internal server error' );
    });
  }

}