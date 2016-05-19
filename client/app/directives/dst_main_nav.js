angular.module( 'modernnights.directive', [] )

.directive ( 'dstMainNav', function() {
    return {
      restrict: 'E',
      controller: function( $scope, Auth ) {
        $scope.signedin = Auth.isAuth();
        $scope.signout = function() {
          Auth.signout();
          $scope.signedin = false;
        }
        // Need to set signedin to true when someone signs in.
        $scope.username = Auth.getUserName();
      },
      templateUrl: 'app/directives/dst_main_nav.html'
  }
});