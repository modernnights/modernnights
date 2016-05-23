'use strict';

const models = require( '../models' );
const jwt = require( 'jwt-simple' );
const Player = models.Player;
const Permission = models.Permission;
const errorHandler = require( '../lib/helpers.js' ).errorHandler;

module.exports = {

  /**
   * Responds with current player in json
   */
  whoami: function ( req, res ) {
    res.send( jwt.decode( req.headers["x-access-token"], process.env.JWT_SECRET ).username );
  },

  /**
   * Responds with all players in json
   */
  getPlayers: function ( req, res ) {},

  /**
   * Responds with an individual player in json
   */
  getPlayer: function ( req, res ) {},

  /**
   * Expects req.body.username => username
   * Expects req.body.password => password
   * Adds player to database if they do not already exist
   * Responds with a JWT
   */
  signup: function( req, res ) {
    const username = req.body.username;
    const password = req.body.password;

    Player.findOne({ where: { username } })
    .then( function( user ) {
      if( !user ) {
        // Create a new user!
        let newUser;
        return Permission.findOne( { where: { name: 'Mortal' } } )
        .then( function( permission ) {
          newUser = Player.build({ username, password, permission_id: permission.get('id') });
          return newUser.save(); // send Promise on to next .then
        })
      } else {
        console.error( 'User exists. Guest tried: ', username, 'with ', req.body );
        res.status( 400 ).send( 'That user already exists. Did you forget your password?' );
        //TODO: redirect to signin?
        return "exists";
      }
    })
    .then( function( user ) {
      if( user === null ) {
        res.status( 500 ).send( 'Error creating new user' );
        return null;
      } else if ( user === "exists" ) {
        return null;
      }
      // create token to send back for auth
      var token = jwt.encode( user, process.env.JWT_SECRET );
      res.json({ token: token });
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

  /**
   * Expects req.body.username => username
   * Expects req.body.password => password
   * Responds with a JWT
   */
  signin: function( req, res ) {
    const username = req.body.username;
    const password = req.body.password;

    Player.findOne({ where: { username } })
    .then( function( user ) {
      if( user ) {
        // Compare given password with stored password
          // If they are a match, send a jwt
          // Otherwise, send a 400 code
      } else {
        console.error( 'User not found. Guest tried: ', username, 'with ', req.body );
        res.status( 404 ).send( 'User not found' );
        return null;
        //TODO: redirect to signup?
      }
    })
    .then( function( user ) {
      if( user === null ) {
        res.status( 500 ).send( 'Error signing in' );
        return null;
      }
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

}
