"use strict";

module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define("Permission", {
    name: DataTypes.STRING,
    readAll: DataTypes.BOOLEAN,
    writeAll: DataTypes.BOOLEAN,
  });

  return Permission;
};
