"use strict";

module.exports = function( sequelize, DataTypes ) {
  var MonsterStats = sequelize.define( "MonsterStats", {
    first_dot_xp_cost: DataTypes.INTEGER,
    current_rating_xp_cost: DataTypes.INTEGER,
    per_dot_xp_cost: DataTypes.INTEGER,
    per_dot_freebie_cost: DataTypes.INTEGER,
  });

  return MonsterStats;
};
