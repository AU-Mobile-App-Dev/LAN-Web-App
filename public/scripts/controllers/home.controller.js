angular.module('lanApp')

.controller('homeController', function($scope, newsfeedService, $location){
    $scope.newsfeedArray = [];
    $scope.username = sessionStorage.getItem('usrename');
    $scope.userAvatar = sessionStorage.getItem('avatar');
    $scope.hideNews = false;
    
    $scope.isCurrentUser = function(author){
        return author === $scope.username;
    }
    newsfeedService.getNewsfeed(function(result){
        if(result.hasOwnProperty("204")){
            $scope.hideNews = true;
        }
        $scope.newsfeedArray = result;
        
    });
    
    $scope.postNews = function(){
        newsfeedService.postNews($scope.newsfeedMessage, function(result){
            if(result){
                    $scope.newsfeedArray.push({
                        message: $scope.newsfeedMessage, 
                        username:sessionStorage.getItem('username'), 
                        id :sessionStorage.getItem('userID'), 
                        status: 1,
                        user_avatar: sessionStorage.getItem('avatar')});
                    $scope.newsfeedMessage = "";
              
            }
        });
    }
    
    $scope.deleteNews = function(index){
        newsfeedService.deleteNews($scope.newsfeedArray[index].id);
       $scope.newsfeedArray.splice(index, 1);
    }
   
  
})