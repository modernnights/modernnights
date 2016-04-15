"use strict";

module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: DataTypes.STRING,
    dbref: DataTypes.STRING,
    xp: DataTypes.INTEGER,
    freebies: DataTypes.INTEGER,
    concept: DataTypes.STRING,
    path_value: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        Character.hasOne(models.Player);
        Character.hasOne(models.Monster);
        Character.hasOne(models.Character, {as: 'Sire'});
        Character.hasOne(models.Archetype, {as: 'Nature'});
        Character.hasOne(models.Archetype, {as: 'Demeanor'});
        Character.hasOne(models.Path);
      }
    }
  });

  return Character;
};