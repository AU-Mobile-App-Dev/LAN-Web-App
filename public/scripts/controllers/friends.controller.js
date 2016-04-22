angular.module('lanApp')

.controller('friendController', function($scope, friendService){
    $scope.friends = [];
    friendService.getFriends(function(result){
        if(result.length > 0){
            $scope.friends = result;
            $scope.noFriends = false;
        }else{$scope.noFriends = true}
    })
         
})