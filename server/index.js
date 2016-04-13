'use strict';

const express = require( 'express' );
const app = express();
const http = require( 'http' ).Server( app );

const PORT = process.env.PORT || 3000;

http.listen( PORT );
console.log( 'Listening on port' + PORT );

module.exports = app;