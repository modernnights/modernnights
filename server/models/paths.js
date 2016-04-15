"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Path = sequelize.define( "Path", {
    name: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
    conviction: DataTypes.BOOLEAN,
    instinct: DataTypes.BOOLEAN,
  });

  return Path;
};
