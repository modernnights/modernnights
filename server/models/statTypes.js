"use strict";

module.exports = function( sequelize, DataTypes ) {
  var StatType = sequelize.define( "StatType", {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function( models ) {
        StatType.belongsTo( models.StatType, {as: 'parent_type'} );
      }
    }
  });

  return StatType;
};
