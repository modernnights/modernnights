"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pool = sequelize.define("Pool", {
    name: DataTypes.STRING
  });

  return Pool;
};
