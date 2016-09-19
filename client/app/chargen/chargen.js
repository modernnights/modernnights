angular.module( 'modernnights.chargen', [] )

.controller( 'ChargenController', function( Character, Stat, $location, $scope ) {
  
  $scope.templates = ['Vampire','Revenant','Ghoul'];
  
  $scope.updateselection = function(){
    var classification="";
    if( $scope.character.template === "Revenant" ){
      classification = "Family";
    } else {
      classification = "Clan";
    }
    
    Stat.getMonstersByType( classification )
    .then( function( data ){
      $scope.monsterselection = data;
    })
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
  $scope.standardtrait = [5, 4, 3, 2, 1];
  
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
