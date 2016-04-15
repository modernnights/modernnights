"use strict";

module.exports = function( sequelize, DataTypes ) {
  var CharacterStats = sequelize.define( "CharacterStats", {
    value: DataTypes.INTEGER,
    note: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function( models ) {
        CharacterStats.hasMany( models.Specialties );
      }
    }
  });

  return CharacterStats;
};
