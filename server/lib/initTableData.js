'use strict';

module.exports = function( models ) {
  /* Permissions */
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
  const types = [
    {
      name: 'attributes',
      rest: [
        { name: 'physical' },
        { name: 'mental' },
        { name: 'social' }
      ]
    },
    {
      name: 'abilities',
      rest: [
        { name: 'talents' },
        { name: 'skills' },
        { name: 'knowledges' }
      ]
    },
    {
      name: 'advantages',
      rest: [
        { name: 'backgrounds' },
        { name: 'virtues' },
        { 
          name: 'powers',
          rest: [
            { name: 'disciplines' }
          ]
        },
        {
          name: 'quirks',
          rest: [
            { name: 'merits' },
            { name: 'flaws' }
          ]
        }
      ]
    }
  ];
  const addTypes = function( types, prevID ) {
    types.forEach( function( type ) {
      models.StatType.findOrCreate({
        where: {
          name: type.name,
          parent_type_id: prevID,
        }
      }).spread( function( instance ) {
        if( type.rest ) {
          addTypes( type.rest, instance.get('id') );
        }
      })
    });
  }
  addTypes( types, null );
  // todo: bulk-add spreads
  const spreads = [
    [7, 5, 3],
    [6, 4, 3],
    [13, 9, 5],
    [11, 7, 4],
    [3, 0, 0],
    [4, 0, 0],
    [5, 0, 0],
    [2, 0, 0]
  ];
  spreads.forEach( function( spread ) {
    models.Spread.findOrCreate({
      where: {
        primary: spread[0],
        secondary: spread[1],
        tertiary: spread[2]
      }
    })
  });
  // todo: bulk-add stats
  // todo: bulk-add monsters
    // mortal
      // werewolf
        // subtype
          // subtype
      // vampire
        // clan
          // bloodline
    // Where do ghoul and revenant sit?

  // todo: bulk-add orgs

}