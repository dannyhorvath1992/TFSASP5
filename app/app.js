'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp' , [
    'ngRoute',
    'todoApp.home',
    'todoApp.register',
    'todoApp.welcome',
    'todoApp.addTodo'
]).config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}])
