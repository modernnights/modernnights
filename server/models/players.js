"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Player = sequelize.define( "Player", {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    // todo: default hash password
  }, {
    classMethods: {
      associate: function( models ) {
        Player.belongsTo( models.Permission );
      }
    }
  });

  return Player;
};
