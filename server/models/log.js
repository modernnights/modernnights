"use strict";

module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define("Log", {
    name: DataTypes.STRING
  });

  return Log;
};