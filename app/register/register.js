'use strict';

angular.module('todoApp.register', ['ngRoute','firebase'])

    // Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    // Register controller
    .controller('RegisterCtrl', ['$scope', function($scope) {
        var ref = new Firebase("https://fiery-torch-641.firebaseio.com");

        $scope.register = function(){
            if(!$scope.regForm.$invalid){
                var regEmail = $scope.user.email;
                var regPassword = $scope.user.password;

                if(regEmail && regPassword){
                    ref.createUser({
                        email: regEmail,
                        password: regPassword
                    }, function(error, userData) {
                        if (error) {
                            switch (error.code) {
                                case "EMAIL_TAKEN":
                                    console.log("The new user account cannot be created because the email is already in use.");
                                    break;
                                case "INVALID_EMAIL":
                                    console.log("The specified email is not a valid email.");
                                    break;
                                default:
                                    console.log("Error creating user:", error);
                            }
                        } else {
                            console.log("Successfully created user account with uid:", userData.uid);
                        }
                    });
                }
            }
        };
    }]);