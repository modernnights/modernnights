"use strict";

module.exports = function(sequelize, DataTypes) {
  var Monster = sequelize.define("Monster", {
    name: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        Monster.belongsTo( models.Monster, {as: 'parent_monster'} );
        Monster.belongsTo( models.Spread, {as: 'attribute_spread'} );
        Monster.belongsTo( models.Spread, {as: 'ability_spread'} );
        Monster.belongsTo( models.Spread, {as: 'background_spread'} );
        Monster.belongsTo( models.Spread, {as: 'power_spread'} );
      }
    }
  });

  return Monster;
};
