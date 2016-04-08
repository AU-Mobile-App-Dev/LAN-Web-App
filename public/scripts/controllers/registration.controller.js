angular.module('lanApp')

.controller('registrationController', function($scope, regService){
    $scope.registerUser = function(){
        var userObject = {username: $scope.username, password: $scope.password, zip:$scope.zip, email:$scope.email};
        regService.registerUser(userObject, function(result){
            
        });
    }
})