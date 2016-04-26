"use strict";

module.exports = function( sequelize, DataTypes ) {
  var MonsterRarity = sequelize.define( "monsterRarity", {
    rarity: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        MonsterRarity.belongsTo( models.Org );
        MonsterRarity.belongsTo( models.Monster );
      }
    }
  });

  return MonsterRarity;
};
