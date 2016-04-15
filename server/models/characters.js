"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Character = sequelize.define( "Character", {
    name: DataTypes.STRING,
    dbref: DataTypes.STRING,
    xp: DataTypes.INTEGER,
    freebies: DataTypes.INTEGER,
    concept: DataTypes.STRING,
    path_value: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        Character.belongsTo( models.Player );
        Character.belongsTo( models.Monster );
        Character.belongsTo( models.Character, {as: 'Sire'} );
        Character.belongsTo( models.Archetype, {as: 'Nature'} );
        Character.belongsTo( models.Archetype, {as: 'Demeanor'} );
        Character.belongsTo( models.Path );
      }
    }
  });

  return Character;
};
