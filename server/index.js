'use strict';

const express = require( 'express' );
const app = express();
const http = require( 'http' ).Server( app );
const db = require( './config/db' );
const Player = require( './players/players' )( db );

const PORT = process.env.PORT || 3000;

require( './config/middleware' )( app, express );
require( './config/routes' )( app, express );

http.listen( PORT );
console.log( 'Listening on port ' + PORT );

module.exports = app;
