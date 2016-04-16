angular.module('lanApp')

.controller('navbarController', function($scope, sessionService){
    sessionService.checkSession();
    $scope.username = sessionStorage.getItem('username');
    $scope.logout = function(){
        sessionService.destroySession();
    }
})