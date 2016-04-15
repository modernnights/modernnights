"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Org = sequelize.define( "Org", {
    name: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        Org.belongsTo( models.Org, {as: 'parent_org'} );
        Org.belongsToMany( models.Character, {through: models.CharacterOrg} );
      }
    }
  });

  return Org;
};
