"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Monster = sequelize.define( "Monster", {
    name: {
      type: DataTypes.STRING,
    },
    rarity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function( models ) {
        Monster.isHierarchy();
        Monster.belongsTo( models.Spread, {as: 'attribute_spread'} );
        Monster.belongsTo( models.Spread, {as: 'ability_spread'} );
        Monster.belongsTo( models.Spread, {as: 'background_spread'} );
        Monster.belongsTo( models.Spread, {as: 'power_spread'} );
      }
    }
  });

  return Monster;
};