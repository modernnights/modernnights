"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pool = sequelize.define("Pool", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function( models ) {
        Pool.belongsToMany( models.Character, {through: models.CharacterPool} );
      }
    }
  });

  return Pool;
};
