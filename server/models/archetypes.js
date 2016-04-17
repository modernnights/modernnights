"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Archetype = sequelize.define( "Archetype", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    }
  });

  return Archetype;
};
