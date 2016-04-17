"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Org = sequelize.define( "Org", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rarity: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        Org.belongsTo( models.Org, {as: 'parent_org', constraints: false} );
        Org.belongsToMany( models.Character, {through: models.CharacterOrg} );
      }
    }
  });

  return Org;
};
