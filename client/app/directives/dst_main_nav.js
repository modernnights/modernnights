angular.module( 'modernnights.directive', [] )

.directive ( 'dstMainNav', function() {
    return {
      restrict: 'E',
      controller: function( $scope, Auth ) {

        var getUserName = function() {
          Auth.getUserName()
          .then( function( username ) {
            $scope.username = username;
          });
        }

        var init = function() {
          getUserName();
          $scope.signedin = Auth.isAuth();
        }();

        Auth.onSignInChange( function() {
          $scope.signedin = Auth.isAuth();
          getUserName();
        });

        $scope.signout = Auth.signout;

      },
      templateUrl: 'app/directives/dst_main_nav.html'
  }
});
