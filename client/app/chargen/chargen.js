angular.module( 'modernnights.chargen', [] )

.controller( 'ChargenController', function( Character, Stat, $location, $scope ) {
  
  $scope.templates = ['Vampire','Revenant','Ghoul'];
  
  $scope.updatemonsterselection = function(){
    $scope.monstersubselection = null;
    $scope.monsterselection = null;
    $scope.character.monstertype = null;
    $scope.character.monstersubtype = null;
    Stat.getMonstersByType( $scope.character.template )
    .then(function( data ){
      $scope.monsterselection = data;
      setmonsterid( data.id );
    });
  };
    
  $scope.updatemonstersubselection = function( monstertype ){
    $scope.monstersubselection = null;
    Stat.getMonstersByType( monstertype )
    .then( function( data ){
      if( data.length > 1 ){
        $scope.monstersubselection = data;
      }
    });
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
