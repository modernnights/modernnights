"use strict";

module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define("Permission", {
    name: DataTypes.STRING
  });

  return Permission;
};