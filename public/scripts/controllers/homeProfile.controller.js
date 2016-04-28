angular.module('lanApp')

.controller('homeProfileController', function($scope){
    $scope.username = sessionStorage.getItem('username');
    $scope.userAvatar = sessionStorage.getItem('avatar');
})