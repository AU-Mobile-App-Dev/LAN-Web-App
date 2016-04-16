angular.module('lanApp')

.controller('friendController', function($scope, friendService){
    $scope.friends = [];
    $scope.noFriends = true;
    friendService.getFriends(function(result){
        if(result.length > 0){
            $scope.friends = result;
            $scope.noFriends = false; 
        }
       
    });
})