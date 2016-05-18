
angular.module( 'modernnights.auth', [] )

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function ( isValid ) {
    if ( isValid ) {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.modernnights', token);
          $location.path('/home');
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  $scope.signup = function ( isValid ) {
    if ( isValid ) {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.modernnights', token);
          $location.path('/home');
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
});
