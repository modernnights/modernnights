angular.module( 'modernnights.chargen', [] )

.controller( 'ChargenController', function( Character, Stat, $location, $scope ) {
  
  $scope.templates = ['Vampire','Revenant','Ghoul'];
  
  $scope.updatemonsterselection = function(){
    var classification="";
    $scope.character.monster_id = null;
    $scope.monstersubselection = [];
    if( $scope.character.template === "Revenant" ){
      Stat.getMonstersByType('Family')
      .then(function( data ){
        $scope.monsterselection = data;
      });
    } else {
      Stat.getMonsterTypes()
      .then( function( data ){
        $scope.monsterselection = [];
        data.forEach( function( data ){
          if( data.parent_monster_id === 5 ){
            $scope.monsterselection.push( {name: data.name, id: data.id} );  
          }
        });
      });
    }
  };
  
  $scope.updatemonstersubselection = function( monstertype ){
    $scope.character.monster_id = null;
    if( $scope.character.template === "Vampire" || $scope.character.template === "Ghoul"  ){
      Stat.getMonstersByType( monstertype )
      .then( function( data ){
        if( data.length > 1 ){
          $scope.monstersubselection = data;
        } else {
          $scope.character.monster_id = data[0].id;
        }
      });
    } else {
      $scope.character.monster_id = monstertype; 
    }
  };
  
  $scope.character = {
    mental: [],
    social: [],
    physical: [],
    talents: [],
    skills: [],
    knowledges: []
  }
   
  var getDropdowns = function(){
    Stat.getArchetypes()
    .then( function( data ){
      $scope.archetypes = data;
    });
  };
  
  var getStandardStats = function(){
    Stat.getStatsByType( 'mental' )
    .then( function( data ){
      $scope.mentalattributes = data; 
    });
    
    Stat.getStatsByType( 'social' )
    .then( function( data ){
      $scope.socialattributes = data;
    });
    
    Stat.getStatsByType( 'physical' )
    .then( function( data ){
      $scope.physicalattributes = data;
    });
  
    Stat.getStatsByType( 'talents' )
    .then( function (data){
      $scope.talents = data;
    });
    
    Stat.getStatsByType( 'skills' )
    .then( function (data){
      $scope.skills = data;
    });
    
    Stat.getStatsByType( 'knowledges' )
    .then( function(data){
      $scope.knowledges = data;
    });
  };
  
  getDropdowns();
  getStandardStats();
  $scope.standardtrait = [1,2,3,4,5];
  
  $scope.chargen = function( isValid ) {
    if ( isValid ) {
      Character.create( $scope.character )
      .then( function() {
        $location.path( '/roster' );
      })
      .catch( console.error );
    }
  }
});
