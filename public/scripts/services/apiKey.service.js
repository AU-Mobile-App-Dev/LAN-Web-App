angular.module('lanApp')

.service('apikeyService', function($http){
    this.getApiKey = function(userObject, callback){
        $http({
            method: 'POST',
            url: uri+"/getKey",
            data:{username: userObject.username, password:userObject.password}
        }).then(function successCallback(response) {
            callback(response.data);

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
})