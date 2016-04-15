"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Log = sequelize.define( "Log", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    xp_change: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function( models ) {
        Log.belongsTo( models.Character );
        Log.belongsTo( models.Player );
        Log.belongsTo( models.Player, {as: 'approved_by'} );
      }
    }
  });

  return Log;
};
