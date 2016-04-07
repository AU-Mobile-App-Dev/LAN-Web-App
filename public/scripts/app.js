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

.controller('homeController', function($scope, authService, newsfeedService){
    authService.checkSession();
    $scope.newsfeedArray = [];
    
    authService.getCurrentUser(function(currentUser){
        $scope.username = currentUser;
    });
    
    newsfeedService.getNewsfeed(function(result){
        $scope.newsfeedArray = result;
    });
    
    $scope.postNews = function(){
        newsfeedService.postNews($scope.newsfeedMessage, function(result){
            if(result){
                 newsfeedService.getNewsfeed(function(result){
                    $scope.newsfeedArray = result;
                    $scope.newsfeedMessage = "";
                });
            }
        });
    }
    
    
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