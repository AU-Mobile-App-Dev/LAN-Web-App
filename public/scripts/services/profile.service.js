angular.module('lanApp')

.service('profileService', function($http){
    this.getProfilesByLocation = function(userZip, callback){
        $http({
            method: 'POST',
            url: uri+"/users/location",
            data:{session: sessionStorage.getItem("session"), zip: userZip}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    this.getProfilesByUsername = function(username, callback){
        $http({
            method: 'POST',
            url: uri+"/users/username",
            data:{session: sessionStorage.getItem("session"), username: username}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    
})