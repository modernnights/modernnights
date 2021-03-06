"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Path = sequelize.define( "Path", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.TEXT,
    rarity: DataTypes.INTEGER,
    conviction: DataTypes.BOOLEAN,
    instinct: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function( models ) {
      }
    }
  });

  return Path;
};
