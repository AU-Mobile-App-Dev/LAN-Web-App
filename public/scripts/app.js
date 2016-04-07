var uri = "http://localhost:5000";

angular.module('lanApp', ['ngRoute', 'ngResource'])

.controller('registrationController', function($scope, regService){
    $scope.registerUser = function(){
        var userObject = {username: $scope.username, password: $scope.password, zip:$scope.zip, email:$scope.email};
        regService.registerUser(userObject, function(result){
            
        });
    }
})

.controller('loginController', function($scope, authService){
    $scope.login = function(){
        var userObject = {username: $scope.username, password: $scope.password};
        authService.authenticateCreds(userObject, function(result){
            
        });
    }
})

.controller('homeController', function($scope, authService){
    authService.checkSession();
    $scope.currentUser = authService.getCurrentUser;
})

.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'registrationController'
        })

        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        
        .when('/regsuccess', {
            templateUrl: 'regSuccess.html'
        });
});