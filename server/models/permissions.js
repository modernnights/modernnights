"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Permission = sequelize.define( "Permission", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    readAll: DataTypes.BOOLEAN,
    writeAll: DataTypes.BOOLEAN,
  });

  return Permission;
};
