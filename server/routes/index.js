'use strict';

/* controllers */
const archetypeController = require( '../controllers/archetypeController' );
const monsterController = require( '../controllers/monsterController' );
const playerController = require( '../controllers/playerController' );
const characterController = require( '../controllers/characterController' );
const statController = require( '../controllers/statController' );
const poolController = require( '../controllers/poolController' );
const costController = require( '../controllers/costController' );

const helpers = require( '../lib/helpers' );

module.exports = function ( app, express ) {
  /* WHOAMI */
  app.post( '/api/whoami', playerController.whoami );
  app.post( '/api/signup', playerController.signup );
  app.post( '/api/signin', playerController.signin );

  /* PLAYERS */
  app.get( '/api/players', playerController.getPlayers );

  /* CHARACTERS */
  app.get( '/api/characters', characterController.getCharacters );
  app.get( '/api/characters/:id', characterController.getCharacterById );
  // TODO: use mysql ID or Dbref as keys
  // Should only get characters that the person can see
  // 'all' if permissions allow for readAll
  // only characters owned by Player otherwise
  // none if not logged in
  app.get( '/api/players/:id/characters', characterController.getCharactersByPlayer );
  app.post( '/api/characters', characterController.makeCharacter );
  app.put( '/api/characters/:id', characterController.editCharacter );

  /* MONSTERS */
  app.get( '/api/monsters', monsterController.getMonsters );
  app.get( '/api/monsters/:id', monsterController.getMonsterById );

  /* COSTS */
  app.get( '/api/stats/:sname/cost/:mid', costController.getMonsterCosts );

  /* STATS */
  app.get( '/api/stats', statController.getStats );
  app.get( '/api/stats/:sname', statController.getStatByName );
  app.get( '/api/stats/type/:id', statController.getStatsByType );

  /* CHARACTER STATS */
  app.get( '/api/characters/:cid/:sname', characterController.getCharacterStat );
  app.put( '/api/characters/:cid/:sname', characterController.editCharacterStat );
  app.get( '/api/characters/:cid/:sname/specialties', characterController.getCharacterSpecialties );
  app.post( '/api/characters/:cid/:sname/specialties', characterController.addCharacterSpecialty );
  app.put( '/api/characters/:cid/:sname/specialties/:spid', characterController.editCharacterSpecialty );

  /* POOLS */
  app.get( '/api/pools', poolController.getPools );
  app.get( '/api/characters/:id/pools', poolController.getCharacterPools );
  app.get( '/api/characters/:cid/pools/:pname', poolController.getCharacterPool );
  app.post( '/api/characters/:cid/pools/:pname/burn', poolController.burnPoolOnce );
  app.post( '/api/characters/:cid/pools/:pname/burn/:num', poolController.burnPool );

  /* COSTS */

  /* ARCHETYPES */
  app.get( '/api/archetypes', archetypeController.getArchetypes );
  app.get( '/api/archetypes/:name', archetypeController.getArchetypeByName );

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use( helpers.errorLogger );
  app.use( helpers.errorHandler );

};
