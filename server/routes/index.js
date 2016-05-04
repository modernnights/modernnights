'use strict';

/* controllers */
const archetypeController = require( '../controllers/archetypeController' );
const monsterController = require( '../controllers/monsterController' );
const playerController = require( '../controllers/playerController' );
const characterController = require( '../controllers/characterController' );
const statController = require( '../controllers/statController' );

const helpers = require( '../lib/helpers' );

module.exports = function ( app, express ) {
  /* WHOAMI */
  
  /* PLAYERS */

  /* CHARACTERS */
  // app.get( '/api/characters', characterController.getCharacters );
  // Should only get characters that the person can see
  // 'all' if permissions allow for readAll
  // only characters owned by Player otherwise
  // none if not logged in

  /* MONSTERS */
  app.get( '/api/monsters', monsterController.getMonsters );
  app.get( '/api/monsters/:id', monsterController.getMonsterById );

  /* STATS */
  app.get( '/api/stats', statController.getStats );
  app.get( '/api/stats/:id', statController.getStatById );
  app.get( '/api/stats/type/:id', statController.getStatsByType );

  /* POOLS */

  /* COSTS */

  /* ARCHETYPES */
  app.get( '/api/archetypes', archetypeController.getArchetypes );
  app.get( '/api/archetypes/:id', archetypeController.getArchetypeById );

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use( helpers.errorLogger );
  app.use( helpers.errorHandler );

};
