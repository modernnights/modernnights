"use strict";

module.exports = function(sequelize, DataTypes) {
  var Monster = sequelize.define("Monster", {
    name: DataTypes.STRING
  });

  return Monster;
};
