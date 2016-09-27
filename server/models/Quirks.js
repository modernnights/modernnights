"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Quirk = sequelize.define( "Quirk", {
    value: DataTypes.INTEGER,
    }, {
    classMethods: {
      associate: function( models ) {
        Quirk.belongsTo( models.Stat );
      }
    }
  });
  return Quirk;
};