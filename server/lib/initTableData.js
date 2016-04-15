'use strict';

module.exports = function( models ) {
  // todo: make this happen just once
  models.Permission.create({
    name: 'Mortal',
    readAll: false,
    writeAll: false,
  });
  models.Permission.create({
    name: 'Royalty',
    readAll: true,
    writeAll: false,
  });
  models.Permission.create({
    name: 'Wizard',
    readAll: true,
    writeAll: true,
  });
  // todo: bulk-add archetypes
  // todo: bulk-add stat types
  // todo: bulk-add spreads
  // todo: bulk-add stats
  // todo: bulk-add monsters
  // todo: bulk-add orgs

}