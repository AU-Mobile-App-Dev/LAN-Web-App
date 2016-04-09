angular.module('lanApp')

.controller('loginController', function($scope, authService){
    $scope.login = function(){
        var userObject = {username: $scope.username, password: $scope.password};
        authService.authenticateCreds(userObject, function(result){
            
        });
    }
})