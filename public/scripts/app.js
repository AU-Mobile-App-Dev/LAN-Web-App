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
        
        .when('/friendMap',{
            templateUrl:'map.html',
            controller: 'friendMapController'
        })
        
        .when('/regSuccess', {
            templateUrl: 'regSuccess.html'
        });
});