var Sequelize = require( 'sequelize' );

var user = process.env.SQLUSER || null;
var password = process.env.SQLPASS || null;
var port = process.env.SQLPORT || 3306;

var db = new Sequelize( 'muxdata', user, password, {
  host: 'localhost',
  port: port,
  dialect: 'mysql',

  define: {
    underscored: true
  }

});

module.exports = db;
