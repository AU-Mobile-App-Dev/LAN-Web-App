var uri = "http://localhost:5000";

angular.module('lanApp', ['ngRoute', 'ngResource'])


.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'loginController'
        })

        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registrationController'
        })
        
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        
        .when('/regsuccess', {
            templateUrl: 'regSuccess.html'
        });
});