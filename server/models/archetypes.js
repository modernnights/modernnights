"use strict";

module.exports = function(sequelize, DataTypes) {
  var Archetype = sequelize.define("Archetype", {
    name: DataTypes.STRING,
  });

  return Archetype;
};