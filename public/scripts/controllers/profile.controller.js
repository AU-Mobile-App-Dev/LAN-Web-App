angular.module('lanApp')

.controller('mapProfileController', function($scope, $routeParams, profileService){
    $scope.profiles = [];
    
    profileService.getProfilesByLocation($routeParams.zip, function(result){
        $scope.profiles = result;
    });
    
})

.controller('profileController', function($scope, $routeParams, profileService, friendService){
    $scope.profile = {};
    $scope.writingMessage = false;
    
    profileService.getProfilesByUsername($routeParams.username, function(result){
        $scope.profile = result[0];
        $scope.isCurrentUser = sessionStorage.getItem('username') === result[0].username;
    })
    
    $scope.writeMessage = function(){
        $scope.writingMessage = true;
    }
    $scope.sendFriendRequest = function(){
        friendService.sendRequest($scope.profile.id, function(result){
            
        });
    }
})