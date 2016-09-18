'use strict';

var Sequelize = require( 'sequelize' );

var user = process.env.SQLUSER || 'root';
var password = process.env.SQLPASS || null;
var port = process.env.SQLPORT || 3306;
var database = process.env.SQLDBNAME || 'muxdata'

var sequelize = new Sequelize(  database, user, password, {
  host: 'localhost',
  port: port,
  dialect: 'mariadb',
  dialectOptions: {
    multipleStatements: true
  },

  define: {
    underscored: true
  }

});

module.exports = sequelize;
