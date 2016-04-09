angular.module('lanApp')

.controller('homeController', function($scope, sessionService, authService, newsfeedService, $location){
    sessionService.checkSession(function(result){
    if(result){
            
    console.log(authService.getCurrentUser().userAvatar);
    $scope.newsfeedArray;
    $scope.username = authService.getCurrentUser().username;
    $scope.userAvatar = authService.getCurrentUser().userAvatar;

    
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
    
    $scope.deleteNews = function(index){
        newsfeedService.deleteNews($scope.newsfeedArray[index].id);
       $scope.newsfeedArray.splice(index, 1);
    }
    
    $scope.logout = function(){
    sessionService.destroySession();
    }
    }
    else{
        $location.path('');//user is not validated to view this route, kick them back to login
    }
    });
    
})