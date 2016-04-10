'use strict'

angular.module('todoApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.service('CommonProp', function($location) {
    var user = '';
    var ref = new Firebase("https://blistering-heat-2473.firebaseio.com");

    return {
        getUser: function() {
            if(user == ''){
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        setUser: function(value) {
            localStorage.setItem("userEmail", value);
            user = value;
            console.log('Hallo, ',user);
        },
        logoutUser:function(){
            ref.unauth();
            user='';
            localStorage.removeItem('userEmail');
            console.log('done logout');
            $location.path('/home');
        }
    };
})

.controller('HomeCtrl', ['$scope', '$window', 'CommonProp', function($scope, $window, CommonProp){
    $scope.signIn = function(event) {
        var username = $scope.user.email;
        var password = $scope.user.password;
        var ref = new Firebase("https://fiery-torch-641.firebaseio.com");

        ref.authWithPassword({
            email : username,
            password : password
        }, function(error, authData){
            if(error){
                console.log("Login Failed!", error);
            } else {
                console.log("Authentication successfully with payload:",authData);
                CommonProp.setUser(username);
                $window.location.href = '/app/#/welcome';
                $window.location.href;
            }
        });
    }
}]);