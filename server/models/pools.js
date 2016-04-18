"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Pool = sequelize.define( "Pool", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function( models ) {
        Pool.belongsToMany( models.Character, {through: models.CharacterPool} );
      }
    }
  });

  return Pool;
};
