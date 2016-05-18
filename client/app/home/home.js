angular.module( 'modernnights.home', [] )

.controller( 'HomeController', function( $scope, Auth ) {
  $scope.signout = Auth.signout;
  
  if( Auth.isAuth() ) {
    $scope.signedin = false;
  }
});