angular.module('lanApp')

.controller('homeController', function($scope, sessionService, authService, newsfeedService){
    sessionService.checkSession();
    $scope.newsfeedArray = [];
    $scope.username = authService.getCurrentUser().username;

    
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
    
    $scope.logout = function(){
    sessionService.destroySession();
    }
    
    
})