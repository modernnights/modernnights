"use strict";

module.exports = function( sequelize, DataTypes ) {
  var MonsterType = sequelize.define( "MonsterType", {
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
        MonsterType.belongsTo( models.MonsterType, {as: 'parent_monster', constraints: false} );
      }
    }
  });

  /* Nested Set methods */

  /**
   * @param {number} id Origin row ID
   */
  MonsterType.pathToRoot = function( id ) {
    return sequelize.query( 'SELECT parent.name FROM MonsterTypes AS node, MonsterTypes AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.id = ' + id + ' ORDER BY parent.lft;' );
  }

  /**
   * @param {number} id Origin row ID
   */
  MonsterType.pathToLeaves = function( id ) {
    return sequelize.query( 'SELECT node.* FROM MonsterTypes AS node, MonsterTypes AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND parent.id = ' + id + ' ORDER BY node.lft' );
  };

  MonsterType.allLeaves = function( ) {
    return sequelize.query( 'SELECT * FROM MonsterTypes WHERE lft = rgt-1;' );
  };

  /**
   * @param {object} options As options object for sequelize.model.findOrCreate
   */
  MonsterType.findOrCreateNode = function( options ) {
    options.where = options.where || {};
    var name = options.where.name || null;
    var parent_monster_id = options.where.parent_monster_id || null;

    return new Promise( function( fulfill, reject ) {
      MonsterType.findOne( options )
      .then( function( found ) {
        if( found === null ) {
          // Find out if the node that would be the parent has any children
          MonsterType.findAll( { order: 'lft DESC', where: { parent_monster_id } } )
            .then( function( found ) {
              if( found.length === 0 ) {
                // If not, insert as first child into that node
                MonsterType.insertIntoEmptyNode( parent_monster_id, name )
                .then( function() {
                  MonsterType.findOne({
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
                MonsterType.insertNextToNode( found[found.length-1].id, name )
                .then( function() {
                  MonsterType.findOne({
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

  /**
   * @param {number} id Parent node ID
   * @param {string} name Name of stat type to insert
   */
  MonsterType.insertIntoEmptyNode = function( id, name ) {
    var pre = '';
    if( id !== null ) {
      pre = ' = ';
    } else {
      pre = 'IS ';
    }
    // if adding to a node that has no existing children
    const query = 'LOCK TABLE MonsterTypes WRITE; SELECT @myLeft := lft FROM MonsterTypes WHERE id ' + pre + id + '; SELECT @myLeft := IFNULL( @myLeft, 0 ); UPDATE MonsterTypes SET rgt = rgt + 2 WHERE rgt > @myLeft; UPDATE MonsterTypes SET lft = lft + 2 WHERE lft > @myLeft; INSERT INTO MonsterTypes(name, lft, rgt, parent_monster_id) VALUES("' + name + '", @myLeft + 1, @myLeft + 2, ' + id + '); UNLOCK TABLES;';
    return sequelize.query( query );
  }

  /**
   * @param {number} id Left node ID
   * @param {string} name Name of stat type to insert
   */
  MonsterType.insertNextToNode = function( id, name ) {
    // if not adding to a node that has no existing children
    const query = 'LOCK TABLE MonsterTypes WRITE; SELECT @myRight := rgt FROM MonsterTypes WHERE id = ' + id + '; UPDATE MonsterTypes SET rgt = rgt + 2 WHERE rgt > @myRight; UPDATE MonsterTypes SET lft = lft + 2 WHERE lft > @myRight; INSERT INTO MonsterTypes(name, lft, rgt) VALUES("' + name + '", @myRight + 1, @myRight + 2);';
    return sequelize.query( query );
  }

  /* End Nested Set methods */

  return MonsterType;
};
