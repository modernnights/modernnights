'use strict';

const Sequelize = require( 'sequelize' );

const makePlayer = function( db ) {

  const Player = db.define( 'player', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  });

  Player.sync( {force:false} ).then( function() {
    console.log( "Players table synced." );
  })
  .catch( function( err ) {
    console.log( "Error creating table Players.\n", err );
  });

  return Player;

};
module.exports = makePlayer;
