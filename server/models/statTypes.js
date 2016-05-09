"use strict";

module.exports = function( sequelize, DataTypes ) {
  var StatType = sequelize.define( "StatType", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    lft: DataTypes.INTEGER,
    rgt: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function( models ) {
        StatType.belongsTo( models.StatType, {as: 'parent_type', constraints: false} );
      }
    }
  });

  StatType.traverse = function( id ) {
    return sequelize.query( 'SELECT node.* FROM StatType AS node, StatType AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND parent.id = `' + id + '` ORDER BY node.lft' );
  };

  // StatType.addNode = function( id ) {
    
  // }

  return StatType;
};
