angular.module("words2JoinAPP")
    .controller("signup-ctrl", function ($scope, $rootScope, $http, $routeParams, $location) {
        console.log("Sign up controller");
        $scope.showError = false;
        $rootScope.isLogged = false;
        $scope.username = "";
        $scope.signup = function () {
            console.log("usuario:" + $scope.username + ", Contraseña:" + $scope.password);
            if ($scope.username == null || $scope.username.length == 0 || $scope.password == null || $scope.password.length == 0) {
                $scope.showError = true;
                $scope.error = "Empty fields";
            } else {
                $http.post("/api/v1/signup", {
                    "username": $scope.username,
                    "password": $scope.password
                }).then(function (response) {
                    console.log("Status: " + response.status);
                    if (response.data == $scope.username) {
                        $rootScope.isLogged = true;
                        $rootScope.username = $scope.username;
                        $location.path("/home/" + $scope.username);
                    }
                }, function () {
                    $rootScope.isLogged = false;
                    $scope.showError = true;
                    $scope.error = "There is a user with this username.";
                });
            }
        }
    });