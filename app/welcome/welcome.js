'use strict'

angular.module('todoApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$location', '$firebaseArray', '$firebaseObject', function($scope, CommonProp, $location, $firebaseArray, $firebaseObject){
    $scope.username = CommonProp.getUser();
    if(!$scope.username){
        $location.path('/home');
    }

    $scope.logout = function(){
        CommonProp.logoutUser();
    }

    var ref = new Firebase("https://fiery-torch-641.firebaseio.com/Todos");

    $scope.todos = $firebaseArray(ref);

    $scope.deleteTodo = function(id) {
        console.log("Id: ",id)
        var ref = new Firebase("https://fiery-torch-641.firebaseio.com/Todos/" + id);
        $scope.postToDelete = $firebaseObject(ref);
        console.log("Post", $scope.postToDelete);
        var todo = new Firebase("https://fiery-torch-641.firebaseio.com/Todos/" + $scope.postToDelete.$id);
        console.log("todo", todo);
        todo.remove().then(function(ref){
            console.log("Todo deleted");
        }, function(error){
            console.log("Error: ", error);
        });
    }


}]);