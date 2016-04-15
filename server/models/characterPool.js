"use strict";

module.exports = function( sequelize, DataTypes ) {
  var CharacterPool = sequelize.define( "CharacterPool", {
    value: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
  });

  return CharacterPool;
};
