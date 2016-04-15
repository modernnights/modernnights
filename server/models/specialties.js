"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Specialty = sequelize.define( "Specialty", {
    specialty: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function( models ) {
        Specialty.belongsTo( models.CharacterStats );
      }
    }
  });

  return Specialty;
};
