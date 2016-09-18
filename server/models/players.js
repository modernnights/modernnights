"use strict";

const bcrypt = require( 'bcryptjs-then' );
const SALT_WORK_FACTOR = 10;

module.exports = function( sequelize, DataTypes ) {
  var Player = sequelize.define( 'Player', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function( models ) {
        Player.hasMany( models.Character );
        Player.belongsTo( models.Permission );
      }
    }
  });

  Player.beforeCreate( 'passHash', function( user, options ) {
    return bcrypt.hash( user.password, SALT_WORK_FACTOR )
    .then( function( hash ) {
      user.password = hash;
    })
    .catch( console.error );
  });

  return Player;
};
