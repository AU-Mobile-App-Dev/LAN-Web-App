angular.module('lanApp')

.controller('apiKeyController', function($scope, apikeyService){
    $scope.apiKey;
    $scope.message;
    $scope.apiKeyResult = false;
    
    $scope.getApiKey = function(){
        var userObject = {username: $scope.username, password: $scope.password};
        apikeyService.getApiKey(userObject, function(result){
            $scope.message = result.message;
            $scope.apiKey = result.apiKey;
            $scope.apiKeyResult = true;
        });
    }
})