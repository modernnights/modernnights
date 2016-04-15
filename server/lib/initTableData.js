'use strict';

module.exports = function( models ) {
  /* Initialize Permissions */
  models.Permission.findOrCreate({ 
    where: {
      name: 'Mortal',
      readAll: false,
      writeAll: false,
    }
  });
  models.Permission.findOrCreate({
    where: {
      name: 'Royalty',
      readAll: true,
      writeAll: false,
    }
  });
  models.Permission.findOrCreate({
    where: {
      name: 'Wizard',
      readAll: true,
      writeAll: true,
    }
  });
  /* Archetypes */
  const archetypes = [
    'Architect',
    'Autocrat',
    'Bon Vivant',
    'Bravo',
    'Capitalist',
    'Caregiver',
    'Celebrant',
    'Chameleon',
    'Child',
    'Competitor',
    'Conformist',
    'Conniver',
    'Creep Show',
    'Curmudgeon',
    'Dabbler',
    'Deviant',
    'Director',
    'Enigma',
    'Eye of the Storm',
    'Fanatic',
    'Gallant',
    'Guru',
    'Idealist',
    'Judge',
    'Loner',
    'Martyr',
    'Masochist',
    'Monster',
    'Pedagogue',
    'Penitent',
    'Perfectionist',
    'Rebel',
    'Rogue',
    'Sadist',
    'Scientist',
    'Sociopath',
    'Soldier',
    'Survivor',
    'Thrill-seeker',
    'Traditionalist',
    'Trickster',
    'Visionary'
  ];
  archetypes.forEach( function( archetype ) {
    models.Archetype.findOrCreate({
      where: {
        name: archetype
      }
    });
  })
  // todo: bulk-add stat types
    // attributes
      // physical
      // mental
      // social
    // abilities
      // talents
      // skills
      // knowledges
    // advantages
      // backgrounds
      // virtues
      // disciplines
      // quirks
        // merits
        // flaws

  // todo: bulk-add spreads
  // todo: bulk-add stats
  // todo: bulk-add monsters
  // todo: bulk-add orgs

}