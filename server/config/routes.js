'use strict';

/* controllers */


const helpers = require( './helpers' );

module.exports = function ( app, express ) {
  /* WHOAMI */

  /* PLAYERS */

  /* CHARACTERS */

  /* MONSTERS */

  /* STATS */

  /* POOLS */

  /* COSTS */

  /* ARCHETYPES */

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use( helpers.errorLogger );
  app.use( helpers.errorHandler );

};
