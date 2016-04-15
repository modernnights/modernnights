"use strict";

module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define("Log", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function( models ) {
        Log.belongsTo( models.Character );
      }
    }
  });

  return Log;
};
