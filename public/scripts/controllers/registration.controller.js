angular.module('lanApp')

.controller('registrationController', function($scope, regService){
    $scope.avatarUrls = avatarUrls;
    $scope.selectedAvatar = avatarUrls[0].link;
    $scope.showModal = false;
    
    $scope.showAvatars = function(){
        $scope.showModal = !$scope.showModal;
    }
    $scope.selectAvatar = function(index){
        $scope.selectedAvatar = avatarUrls[index].link;
        $scope.showModal = false;
    }
    
    $scope.registerUser = function(){
        var userObject = {username: $scope.username, password: $scope.password,
             zip:$scope.zip, email:$scope.email, avatar:$scope.selectedAvatar};
        regService.registerUser(userObject, function(result){
            
        });
    }
})