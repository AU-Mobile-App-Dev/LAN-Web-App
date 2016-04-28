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
        
        .when('/apiKey', {
            templateUrl: 'apiKey.html',
            controller: 'apiKeyController'
        })
        
        .when('/apiDoc', {
            templateUrl: 'apiDoc.html',
            controller: 'apiDocController'
        })
        
        .when('/apiDocErrors', {
            templateUrl: 'apiDocErrors.html',
            controller: 'apiDocErrorsController'
        })
        
        .when('/apiDocSamples', {
            templateUrl: 'apiDocSamples.html',
            controller: 'apiDocSamplesController'
        })
        
        .when('/userMap',{
            templateUrl:'map.html',
            controller: 'friendMapController'
        })
        
        .when('/profiles/zip/:zip',{
            templateUrl:'profilesFromMap.html',
            controller: 'mapProfileController'
        })
        
        .when('/profile/username/:username', {
            templateUrl: 'profile.html',
            controller: 'profileController'
        })
        
        .when('/homeProfile', {
            templateUrl: 'homeProfile.html',
            controller: 'homeProfileController'
        })
        
        .when('/messages', {
            templateUrl: 'messages.html',
            controller: 'messageController'
        })
        
        .when('/friends', {
            templateUrl: "friends.html",
            controller: "friendController"
        })
        
        .when('/regSuccess', {
            templateUrl: 'regSuccess.html'
        });
});