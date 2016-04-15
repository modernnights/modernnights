"use strict";

module.exports = function(sequelize, DataTypes) {
  var Spread = sequelize.define("Spread", {
    primary: DataType.INTEGER,
    secondary: DataType.INTEGER,
    tertiary: DataType.INTEGER,
  });

  return Spread;
};
