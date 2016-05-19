angular.module( 'modernnights.directive', [] )

.directive ( 'dstMainNav', function() {
    return {
      restrict: 'E',
      controller: function( $scope, Auth ) {
        $scope.signedin = Auth.isAuth();
        Auth.onSignInChange( function() {
          $scope.signedin = Auth.isAuth();
        })
        $scope.signout = function() {
          Auth.signout();
        }

        $scope.username = Auth.getUserName();
      },
      templateUrl: 'app/directives/dst_main_nav.html'
  }
});