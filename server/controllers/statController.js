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
    //TODO: Find by ID or Name
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
    // Find all children of a given type,
    // select stats where stattype ids are eq to any given stat in tree
    // i.e for a provided id of 1, I want any of these stats:
    // attributes 1
    //   physical 2
    //   mental   3
    //   social   4
    StatType.pathToLeaves( id )
    .spread( function( leaves ) {
      // Create array of stattype ids in this hierarchy
      var ids = leaves.map( function( leaf ) {
        return { id: leaf.id };
      });

      Stat.findAll( { include: [ { model: StatType, where: { $or: ids } } ] } )
      .then( function( data ) {
        if( data.length === 0 ) {
          res.status( 404 ).send( 'No stats found with that type' );
          return null;
        }
        res.json( data );
      }, function( err ) {
        res.status( 500 ).send( 'Internal server error' );
      });
      
    })
  }

}