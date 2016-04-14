var Sequelize = require( 'sequelize' );

var user = process.env.SQLUSER || null;
var password = process.env.SQLPASS || null;

var db = new Sequelize( 'muxdata', user, password, {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    underscored: true
  }
  
});

module.exports = db;
