angular.module('lanApp')

.controller('navbarController', function($scope, sessionService){
    $scope.username = sessionStorage.getItem('username');
    $scope.logout = function(){
        sessionService.destroySession();
    }
})