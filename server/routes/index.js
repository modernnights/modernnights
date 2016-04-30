'use strict';

/* controllers */
const archetypeController = require( '../controllers/archetypeController' );
const playerController = require( '../controllers/playerController' );
const characterController = require( '../controllers/characterController' );
const statController = require( '../controllers/statController' );

const helpers = require( '../lib/helpers' );

module.exports = function ( app, express ) {
  /* WHOAMI */
  
  /* PLAYERS */

  /* CHARACTERS */

  /* MONSTERS */

  /* STATS */

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
