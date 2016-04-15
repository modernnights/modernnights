"use strict";

module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Player.hasOne(models.Permission)
      }
    }
  });

  return Player;
};