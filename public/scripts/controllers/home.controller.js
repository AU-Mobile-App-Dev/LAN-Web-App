angular.module('lanApp')

.controller('homeController', function($scope, newsfeedService, $location){
    $scope.newsfeedArray;
    var currentUser = sessionStorage.getItem('usrename');
    $scope.username = currentUser;
    $scope.userAvatar = sessionStorage.getItem('avatar');
   
    
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
   
  
})