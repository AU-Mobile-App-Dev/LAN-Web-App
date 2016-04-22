angular.module('lanApp')


.controller('profileController', function($scope, $routeParams, profileService, friendService, gameListService){
    $scope.profile = {};
    $scope.writingMessage = false;
    $scope.requestSent = false;
    $scope.currentUser = sessionStorage.getItem('username');
    var storedFriendsList = JSON.parse(localStorage["friendsNames"]);
    
    
    profileService.getProfilesByUsername($routeParams.username, function(result){
        $scope.profile = result[0];
        $scope.isNotCurrentUser = $scope.currentUser !== result[0].username;
        $scope.isCurrentFriend = storedFriendsList.includes(result[0].username);  
    })
    
    
    $scope.sendMessage = function(){
        
    }
    
    $scope.sendFriendRequest = function(){
        friendService.sendRequest($scope.profile.id, function(result){
            $scope.requestSent = result;
        });
    }
    
})