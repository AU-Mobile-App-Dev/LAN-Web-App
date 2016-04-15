angular.module('lanApp')

.controller('mapProfileController', function($scope, $routeParams, profileService){
    $scope.profiles = [];
    
    profileService.getProfilesByLocation($routeParams.zip, function(result){
        $scope.profiles = result;
    });
    
})

.controller('profileController', function($scope, $routeParams, profileService){
    $scope.profile = {};
    
    profileService.getProfilesByUsername($routeParams.username, function(result){
        $scope.profile = result;
    })
})