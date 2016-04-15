"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Spread = sequelize.define( "Spread", {
    primary: DataTypes.INTEGER,
    secondary: DataTypes.INTEGER,
    tertiary: DataTypes.INTEGER,
  });

  return Spread;
};
