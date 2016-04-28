angular.module('lanApp')


.controller('profileController', function($scope, $routeParams, $location, profileService, friendService, gameListService){
    $scope.profile = {};
    $scope.writingMessage = false;
    $scope.requestSent = false;
    $scope.requestAlreadySent = false;
    var storedFriendsList = JSON.parse(localStorage["friendsNames"]);
    
    if($routeParams.username === sessionStorage.getItem('username')){
        $location.path('homeProfile');
    } 
    
    
    profileService.getProfilesByUsername($routeParams.username, function(result){
        $scope.profile = result[0];
        $scope.isCurrentFriend = storedFriendsList.includes($routeParams.username);
    
    })
    
    
    $scope.sendMessage = function(){
        
    }
    
    $scope.sendFriendRequest = function(){
        friendService.sendRequest($scope.profile.id, function(result){
            if(result){
                 $scope.requestSent = true;
            }else{$scope.requestAlreadySent = true;}
           
        });
    }
    
    $scope.deleteFriend = function(){
        friendService.deleteFriend($routeParams.username, function(result){
            
        })
    }
    
})