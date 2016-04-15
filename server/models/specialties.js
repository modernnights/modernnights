"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Specialties = sequelize.define( "Specialties", {
    specialty: DataTypes.STRING,
  });

  return Specialties;
};
