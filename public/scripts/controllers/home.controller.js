angular.module('lanApp')

.controller('homeController', function($scope, $timeout, newsfeedService, $location){
    $scope.newsfeedArray = [];
    $scope.username = sessionStorage.getItem('usrename');
    $scope.userAvatar = sessionStorage.getItem('avatar');
    $scope.hideNews = false;
    $scope.likeError = false;
    
    $scope.isCurrentUser = function(author){
        return author === $scope.username;
    }
    
    newsfeedService.getNewsfeed(function(result){
        if(result.hasOwnProperty("204")){
            $scope.hideNews = true;
        }
        console.log(result);
        if(Array.isArray(result)){
             $scope.newsfeedArray = result;
        }
       
        
    });
    
    $scope.postNews = function(){
        newsfeedService.postNews($scope.newsfeedMessage, function(result){
            if(result){
                    $scope.newsfeedArray.splice(0,0,{
                        message: $scope.newsfeedMessage, 
                        username:sessionStorage.getItem('username'), 
                        id :sessionStorage.getItem('userID'), 
                        status: 1,
                        user_avatar: sessionStorage.getItem('avatar'),
                        likes: 0});
                    $scope.newsfeedMessage = "";
              
            }
        });
    }
    
    $scope.deleteNews = function(index){
        newsfeedService.deleteNews($scope.newsfeedArray[index].id);
       $scope.newsfeedArray.splice(index, 1);
    }
    
   
  
})