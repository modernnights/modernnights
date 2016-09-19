"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Monster = sequelize.define( "Monster", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rarity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function( models ) {
        Monster.belongsTo( models.MonsterType, {constraints: false} );
        Monster.belongsTo( models.Spread, {as: 'attribute_spread'} );
        Monster.belongsTo( models.Spread, {as: 'ability_spread'} );
        Monster.belongsTo( models.Spread, {as: 'background_spread'} );
        Monster.belongsTo( models.Spread, {as: 'power_spread'} );
      }
    }
  });

  return Monster;
};