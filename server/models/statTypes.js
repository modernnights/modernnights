"use strict";

module.exports = function( sequelize, DataTypes ) {
  var StatType = sequelize.define( "StatType", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    lft: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    rgt: {
      type: DataTypes.INTEGER,
      default: 0,
    }
  }, {
    classMethods: {
      associate: function( models ) {
        StatType.belongsTo( models.StatType, {as: 'parent_type', constraints: false} );
      }
    }
  });

  StatType.singlePath = function( id ) {
    return sequelize.query( 'SELECT parent.name FROM StatTypes AS node, StatTypes AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.id = ' + id + ' ORDER BY parent.lft;' );
  }

  StatType.traverse = function( id ) {
    return sequelize.query( 'SELECT node.* FROM StatTypes AS node, StatTypes AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND parent.id = `' + id + '` ORDER BY node.lft' );
  };

  StatType.findLeaves = function( ) {
    return sequelize.query( 'SELECT * FROM StatTypes WHERE lft = rgt-1;' );
  };

  StatType.findOrCreateNode = function( options ) {
    options.where = options.where || {};
    var name = options.where.name || null;
    var parent_type_id = options.where.parent_type_id || null;

    return new Promise( function( fulfill, reject ) {
      StatType.findOne( options )
      .then( function( found ) {
        if( found === null ) {
          // Find out if the node that would be the parent has any children
          StatType.findAll( { order: 'lft DESC', where: { parent_type_id } } )
            .then( function( found ) {
              if( found.length === 0 ) {
                // If not, insert as first child into that node
                StatType.insertIntoEmptyNode( parent_type_id, name )
                .then( function() {
                  StatType.findOne({
                    where: { name }
                  }).then( function( result ) {
                    fulfill( result );
                  }, function( err ) {
                    console.log( err );
                    reject( err );
                  });
                }, function( err ) {
                  console.log( err );
                  reject( err );
                });
              } else {
                // If yes, find children and insert next to last child
                StatType.insertNextToNode( found[found.length-1].id, name )
                .then( function() {
                  StatType.findOne({
                    where: { name }
                  }).then( function( result ) {
                    fulfill( result );
                  }, function( err ) {
                    console.log( err );
                    reject( err );
                  });
                }, function( err ) {
                  console.log( err );
                  reject( err );
                });
              }
            })
        } else {
          // The node already exists
          fulfill( found )
        }
      }, function( err ) {
        console.log( err );
        reject( err );
      });
    });

  }

  StatType.insertIntoEmptyNode = function( id, name ) {
    var pre = '';
    if( id !== null ) {
      pre = ' = ';
    } else {
      pre = 'IS ';
    }
    // if adding to a node that has no existing children
    const query = 'LOCK TABLE StatTypes WRITE; SELECT @myLeft := lft FROM StatTypes WHERE id ' + pre + id + '; SELECT @myLeft := IFNULL( @myLeft, 0 ); UPDATE StatTypes SET rgt = rgt + 2 WHERE rgt > @myLeft; UPDATE StatTypes SET lft = lft + 2 WHERE lft > @myLeft; INSERT INTO StatTypes(name, lft, rgt, parent_type_id) VALUES("' + name + '", @myLeft + 1, @myLeft + 2, ' + id + '); UNLOCK TABLES;';
    return sequelize.query( query );
  }

  StatType.insertNextToNode = function( id, name ) {
    // if not adding to a node that has no existing children
    const query = 'LOCK TABLE StatTypes WRITE; SELECT @myRight := rgt FROM StatTypes WHERE id = ' + id + '; UPDATE StatTypes SET rgt = rgt + 2 WHERE rgt > @myRight; UPDATE StatTypes SET lft = lft + 2 WHERE lft > @myRight; INSERT INTO StatTypes(name, lft, rgt) VALUES("' + name + '", @myRight + 1, @myRight + 2);';
    return sequelize.query( query );
  }

  return StatType;
};
