angular.module('lanApp')

.service('newsfeedService', function($http, $location){
    this.getNewsfeed = function(callback){
         $http({
            method: 'POST',
            url: uri+"/newsfeed",
            data:{session: sessionStorage.getItem("key")}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data);

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
    
    this.postNews = function(message, callback){
         $http({
            method: 'PUT',
            url: uri+"/newsfeed/add",
            data:{session: sessionStorage.getItem("key"), message: message}
        }).then(function successCallback(response) {
            callback(true);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
})