'use strict';
const app = require( './app' );
const models = require( './models/index' );
const initTableData = require( './lib/initTableData' );
/* Set the port, default 3000 */
app.set( 'port', process.env.PORT || 3000 );
/* Start the server */
const http = require( 'http' ).Server( app ); 

/* Warn about environment variables */
const warnEnvVars = function( vars ) {
  let didWarn = false;
  let warnString = '';
  vars.forEach( function( envVar ) {
    if( !process.env[envVar] ) {
      didWarn = true;
      warnString += '\n* It may be a good idea to set the ' + envVar + ' environment variable. You can use `export ' + envVar + '=<text>` to do this.';
    }
  });

  if( didWarn ) {
    console.log( 'WARNING:', warnString );
  }
}

warnEnvVars( ['PORT', 'JWT_SECRET', 'SQLUSER', 'SQLPASS', 'SQLPORT', 'SQLDBNAME'] );
process.env.JWT_SECRET  = process.env.JWT_SECRET || 'asf23r9sdf21';

// force:true in the line below forces Sequelize to drop all tables and re-add them
// whenever the server starts. Change this to force:false when deploying
models.sequelize.sync({force:true}).then( () => {
  var server = http.listen( app.get( 'port' ), () => {
    console.log( 'Express server listening on ' + server.address().port );
    initTableData(models);
  });
})
.catch( ( error ) => {
  console.error( error );
});