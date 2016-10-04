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
  const stats = [
    {
      name: 'attributes',
      rest: [
        { 
          name: 'physical',
          stats: [
            {
              name: 'strength',
              rarity: 0,
            },
            {
              name: 'dexterity',
              rarity: 0,
            },
            {
              name: 'stamina',
              rarity: 0,
            },
          ],
        },
        {
          name: 'social',
          stats: [
            {
              name: 'charisma',
              rarity: 0,
            },
            {
              name: 'manipulation',
              rarity: 0,
            },
            {
              name: 'appearance',
              rarity: 0,
            },
          ],
        },
        {
          name: 'mental',
          stats: [
            {
              name: 'perception',
              rarity: 0,
            },
            {
              name: 'intelligence',
              rarity: 0,
            },
            {
              name: 'wits',
              rarity: 0,
            },
          ],
        }
      ]
    },
    {
      name: 'abilities',
      rest: [
        {
          name: 'talents',
          stats: [
            'alertness',
            'athletics',
            'awareness',
            'brawl',
            'empathy',
            'expression',
            'intimidation',
            'leadership',
            'streetwise',
            'subterfuge'
          ],
        },
        {
          name: 'skills',
          stats: [
            'animal ken',
            'crafts',
            'drive',
            'etiquette',
            'firearms',
            'larceny',
            'melee',
            'performance',
            'stealth',
            'survival'
          ],
        },
        {
          name: 'knowledges',
          stats: [
            'academics',
            'computer',
            'finance',
            'investigation',
            'law',
            'medicine',
            'occult',
            'politics',
            'science',
            'technology'
          ],
        }
      ]
    },
    {
      name: 'advantages',
      rest: [
        { name: 'backgrounds',
          stats: [
            'Haven',
            'Retainer',
            'Allies',
            'Contacts',
            'Fame',
            'Influence',
            'Resources',
            'Generation',
            'Herd',
            'Rituals',
            'Black Hand Membership',
            'Majordomo',
            'Family Member'
          ],
        },
        {
          name: 'virtues',
          stats: [
            'conscience',
            'self-control',
            'courage',
            'conviction',
            'instinct'
          ],
        },
        { 
          name: 'powers',
          rest: [
            {
              name: 'disciplines',
              stats: [
                { name: 'abombwe', rarity: 11 },
                'animalism',
                'auspex',
                { name: 'bardo', rarity: 11 },
                'celerity',
                'chimerstry',
                { name: 'daimonion', rarity: 11 },
                'dementation',
                'dominate',
                { name: 'flight', rarity: 11 },
                'fortitude',
                { name: 'melpominee', rarity: 11 },
                { name: 'mytherceria', rarity: 11 },
                'necromancy',
                { name: 'obeah', rarity: 11 },
                'obfuscate',
                'obtenebration',
                'potence',
                'presence',
                'protean',
                'quietus',
                { name: 'sanguinus', rarity: 11 },
                'serpentis',
                { name: 'spiritus', rarity: 11 },
                { name: 'temporis', rarity: 11 },
                { name: 'thanatosis', rarity: 11 },
                'thaumaturgy',
                'valeren',
                'vicissitude',
                'visceratika',
              ],
            },
            {
              name: 'thaumaturgy paths',
              stats: [
                'the path of blood',
              ],
            },
            {
              name: 'thaumaturgy rituals',
              rest: [
                {
                  name: 'thaumaturgy rituals 1',
                  stats: [
                    'bind the accusing tongue',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 2',
                  stats: [
                    'blood walk',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 3',
                  stats: [
                    'amulet of mnemosyne',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 4',
                  stats: [
                    'bone of lies',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 5',
                  stats: [
                    'abandon the fetters',
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'quirks',
          rest: [
            { 
              name: 'merits',
              stats: [
              {name: 'acute hearing', values: [1] },
              {name: 'common sense', values: [1] },
              {name: 'harmless', values: [1] },
              {name: 'deceptive aura', values: [1] }
              ]
            },
            { 
              name: 'flaws',
              stats: [
              { name: 'bad sight', values: [-1,-3] },
              { name: 'nightmares', values: [-1] },
              { name: 'dark secret', values: [-1]},
              { name: 'repulsed by garlic', values: [-1] }
              ],
            },
          ],
        },
      ],
    },
  ];
  
 const quirkValues = [
   { name: 'scaling merit', value: '1 2 3 4 5' },
   { name: 'scaling flaw', value: '-1 -2 -3 -4 -5'}
 ]
 
const addStat = function( type, stat ) {
  const id = type.get( 'id' );

  models.Stat.findOrCreate({
    where: {
      name: stat.name || stat,
      stat_type_id: id,
      rarity: stat.rarity || 0,
    }
  })
  .then( function( stat ){
    //if it has values to assign 
    if( stat.values ){
      stat.values.forEach( function( value ){
        models.Quirks.findOrCreate({
          where: 
          { stat_id: stat.id, value: value }
        })
      })
    }  
  })
};
  
  const addTypes = function( types, prevID ) {
    // TODO: Refactor forEaches to use promise.each
    types.forEach( function( type ) {
        models.StatType.findOrCreateNode({
        where: {
          name: type.name,
          parent_type_id: prevID,
        }
      })
      .then( function( instance ) {
        if( type.rest ) {
          addTypes( type.rest, instance.get('id') );
        }
        if( type.stats ) {
          type.stats.forEach( function( stat ) {
            addStat( instance, stat );
          });
        }
      })
    });
  }
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
  
  const monsters = [
    { 
      name: 'Vampire',
      attribute_spread_id: 1,
      ability_spread_id: 3,
      power_spread_id: 5,
      powers: [{name: 'Dominate'}, {name: 'Celerity'}],
      children: [
        {
        name: 'Assamite',
        children: [
        {name:'Sorcerer'}, {name:'Vizier'}, {name:'Warrior'}]
        },
        {
          name: 'Brujah',
          powers: [{name:'Presence'}, {name:'Potence'}, {name:'Celerity'}]
        },
        {
          name: 'Cappadocian',
          children: [{name:'Samedi'}, {name:'Harbinger of Skulls'}]
        },
        {
          name: 'Gangrel',
          children: [{name:'Coyote'}, {name:'Outlander'}]
        },
        {
          name: 'Gargoyle',
        },
        {
          name: 'Lasombra',
          children: [{name:'Lasombra'}, {name:'Kiasyd'}]
        },
        {
          name: 'Malkavian',
          children: [{name:'Malkavian'}, {name:'Ananke'}, {name:'Knight Of The Moon'}]
        },
        {
          name: 'Nosferatu',
        },
        {
          name: 'Ravnos',
        },
        {
          name: 'Salubri',
          children: [{name:'Healer'},{name:'Fury'}]
        },
        {
          name: 'Setite',
          children: [{name:'Follower of Set'}, {name:'Serpent of the Light'}]
        },
        {
          name: 'Toreador',
          children: [{name:'Volgirre'},{name:'Ishtarri'},{name:'Toreador'}]
        },
        {
          name:'Tremere',
          monsters:[{name:'Tremere'},{name:'Telyav'}]
        },
        {
          name: 'Tzimisce',
        },
        {
          name: 'Ventrue',
          children: [{name:'Ventrue'},{name:'Crusader'}]
        }
      ]
    },
    {
      name: 'Ghoul',
      attribute_spread_id: 2,
      ability_spread_id: 3,
      power_spread_id: 8
    },
    {
      name: 'Revenant',
      attribute_spread_id: 2,
      ability_spread_id: 3,
      power_spread_id: 8,
      children: [{name: 'Obertus'}, {name:'Bratovich'}, {name:'Grimaldi'}, {name:'Zantosa'}, {name:'Ducheski'}]
    }
  ];
  
  const addMonster = function( monster,id ){
    addMonsters( monster, id );
  };
  
  const addMonsters = function( monsters, id ){
    monsters.forEach( function( monster ){
      models.Monster.findOrCreate({
        where: {
          name: monster.name,
          parentId: id
        }
      })
      .spread( function( created ){   
        if( monster.children ){
          addMonster( monster.children , created.id );
        }
        
      })
    })   
  };
  
  const addPower = function( power ){
    addPowers( power )
  };
  
  const addPowers = function( monsters ){
  //Associate the powers and monsters 
  }
  
  models.Character.findOrCreate({
    where: {
      name: 'Bob Ross',
      dbref: '#1',
      xp: 250,
      freebies: 0,
      concept: '',
      path_value: 8,
    },
    includes: [{all: true}]
  }).spread( function( character, created ) {
    models.Pool.findOrCreate({ where: { name: 'Willpower' } })
    .spread( function( pool, created ) {
      models.CharacterPool.findOrCreate( {
        where: {
          character_id: character.get('id'),
          pool_id: pool.get('id'),
          value: 8,
          max: 8,
        }
      });
    });
  })
  
  const createChargenData = function( monsterlist, statlist ){
    var createStats = new Promise( function( resolve, reject ){
      addTypes( statlist );
    });
    
    var createMonsters = new Promise( function( resolve, reject ){
      addMonsters( monsterlist, null );
    });
    
    createStats
    .then( function(){
      createMonsters
      .then( function(){
        addPowers( monsterlist );
      });      
    });
  } 
  
  createChargenData( monsters, stats );
 
  
  
  /*
  Table1.find({…}).
  then(function(a_thing_from_table_1){
    Table2.find({…}).
    then(function(a_thing_from_table_2){
      a_thing_from_table_1.addTable2(a_thing_from_table_2); 
    }) 
  })  
  */
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