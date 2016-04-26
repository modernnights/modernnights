"use strict";

module.exports = function( sequelize, DataTypes ) {
  var PathRarity = sequelize.define( "pathRarity", {
    rarity: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        PathRarity.belongsTo( models.Org );
        PathRarity.belongsTo( models.Path );
      }
    }
  });

  return PathRarity;
};
