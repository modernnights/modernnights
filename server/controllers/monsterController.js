const Monster = require( '../models' ).Monster;
const MonsterType = require('../models').MonsterType;

module.exports = {
  
  getMonsters: function( req, res ) {
    Monster.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No monsters found' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

  getMonsterTypes: function( req, res ) {
    MonsterType.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No monster types found' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ){ 
      errorHandler( err, req, res );
    });
  },
  
  getMonstersByType: function( req, res ){
    var id = new Promise( function( resolve, reject ){
      if( isNaN( req.params.id ) ){
        MonsterType.findOne({
          where: 
          {name: req.params.id }
        })
        .then( function( data ){
          if( data === null ){
            res.status( 404 ).send( 'Invalid monster type.' );
            return null;
          } else {
            resolve( data.id );
          }
        })
        .catch( function( err ) {
          errorHandler( err, req, res );
        });
      } else {
        resolve( req.params.id );
      }
    });
    
    id.then(
      function( id ){
        MonsterType.pathToLeaves( id )
        .spread( function( leaves ){
          // Create array of stattype ids in this hierarchy
          var ids = leaves.map( function( leaf ) {
            return { id: leaf.id };
          });
          Monster.findAll( { include: [ { model: MonsterType, where: { $or: ids } } ] } )
          .then( function( data ) {
            if( data.length === 0 ) {
              res.status( 404 ).send( 'No monsters found with that type' );
              return null;
            }
            res.json( data );
          })
          .catch( function( err ) {
            errorHandler( err, req, res );
          });
        })
      });
    //TODO: Handle hierarchy when done with handling stat hierarchy.
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
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  }

}