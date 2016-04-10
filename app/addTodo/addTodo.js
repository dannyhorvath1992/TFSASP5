'use strict';

angular.module('todoApp.addTodo', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addTodo', {
            templateUrl: 'addTodo/addTodo.html',
            controller: 'AddTodoCtrl'
        });
    }])

    .controller('AddTodoCtrl', ['$scope', '$location', 'CommonProp', function($scope, $location, CommonProp) {
        $scope.username = CommonProp.getUser();

        if(!$scope.username){
            $location.path('/home');
        }

        $scope.logout = function(){
            CommonProp.logoutUser();
        }

        $scope.AddTodo = function(){
            var ref = new Firebase("https://fiery-torch-641.firebaseio.com/Todos");

            var title = $scope.todo.title;
            var description = $scope.todo.description;

            ref.push({
                title: title,
                description: description,
                emailId: CommonProp.getUser()
            }).then(function(ref) {
                console.log(ref);
                $location.path('/welcome');
            }, function(error){
                console.log('error: ',error);
            });

        };
    }]);/**
 * Created by dannyhorvath on 09-04-16.
 */
