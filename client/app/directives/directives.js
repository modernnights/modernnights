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
})

.directive( 'visCharXp', function() {
  return {
    restrict: 'E',
    controller: function( $scope, Character ) {
      Character.getAll()
      .then( function( characters ) {
        $scope.circles = characters.map( function( character, idx ) {
          var circle = {};
          var area = 100 * Math.max( character.xp, 1 );
          circle.r = Math.sqrt( area / Math.PI ) + "px";
          circle.x = 200 + idx*200 + "px";
          circle.y = 200 + "px";
          circle.fill = "white"
          return circle;
        })

      });
    },
    templateUrl: 'app/directives/vis_char_xp.html'
  }
})
