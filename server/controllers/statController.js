'use strict';

const StatType = require( '../models' ).StatType;
const Stat = require( '../models' ).Stat;
const errorHandler = require( '../lib/helpers.js' ).errorHandler;

module.exports = {

  getStats: function( req, res ) {
    Stat.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No stats found' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

  // expects 'id' in req.params
  getStatById: function( req, res ) {
    // TODO: find by id or name
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
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

  // expects 'sname' in req.params
  getStatByName: function( req, res ) {
    var name = req.params.sname;
    if( typeof name !== 'string' ) {
      res.status( 400 ).send( 'Invalid name' );
      return null;
    }

    Stat.findOne( { where: { name } } )
    .then( function( data ) {
      if( data === null ) {
        res.status( 404 ).send( 'No stat found by that name' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });

  },

  getStatsByType: function( req, res ){
    var id = new Promise( function( resolve, reject ){
      if( isNaN( req.params.id ) ){
        console.log( "Looking up stat ID.");
        StatType.findOne({
          where: 
          {name: req.params.id }
        })
        .then( function( data ){
          if( data === null ){
            res.status( 404 ).send( 'Invalid stat type.' );
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
        StatType.pathToLeaves( id )
        .spread( function( leaves ){
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
          })
          .catch( function( err ) {
            errorHandler( err, req, res );
          });
        })
      });
    //TODO: Handle hierarchy in StatTypes
    // Find all children of a given type,
    // select stats where stattype ids are eq to any given stat in tree
    // i.e for a provided id of 1, I want any of these stats:
    // attributes 1
    //   physical 2
    //   mental   3
    //   social   4
  },

  canBuy: function( req, res ) {

  },

}
