"use strict";

module.exports = function( sequelize, DataTypes ) {
  var CharacterOrg = sequelize.define( "CharacterOrg", {
    position: DataTypes.STRING,
  });

  return CharacterOrg;
};
