angular.module('lanApp')

.controller('navbarController', function($scope, sessionService){
    sessionService.checkSession();
    $scope.unreadMessages = sessionStorage.getItem('unreadMessages');
    $scope.username = sessionStorage.getItem('username');
    $scope.logout = function(){
        sessionService.destroySession();
    }
})