"use strict";

module.exports = function( sequelize, DataTypes ) {
  var StatType = sequelize.define( "StatType", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    classMethods: {
      associate: function( models ) {
        StatType.belongsTo( models.StatType, {as: 'parent_type', constraints: false} );
      }
    }
  });

  return StatType;
};
