angular.module('lanApp')

.controller('loginController', function($scope, authService){
    $scope.hideInvalidLogin = true;
    $scope.resetInvalidLogin = function(){
         $scope.hideInvalidLogin = true;
    }
    
    $scope.login = function(){
        var userObject = {username: $scope.username, password: $scope.password};
        authService.authenticateCreds(userObject, function(result){
            $scope.hideInvalidLogin = result;
        });
    }
})