"use strict";

module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define("Stat", {
    name: DataTypes.STRING
  });

  return Stat;
};
