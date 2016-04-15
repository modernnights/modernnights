"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Org = sequelize.define( "Org", {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function( models ) {
        Org.belongsTo( models.Org, {as: 'parent_org'} );
      }
    }
  });

  return Org;
};
