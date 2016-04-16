angular.module('lanApp')

.service('messageService', function($http){
    this.getMessages = function(callback){
        $http({
            method: 'POST',
            url: uri+"/messages/get",
            data:{session: sessionStorage.getItem("session"), userID: sessionStorage.getItem('userID')}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    this.deleteMessage = function(messageID, callback){
        $http({
            method: 'POST',
            url: uri+"/messages/delete",
            data:{session: sessionStorage.getItem("session"), messageID: messageID}
        }).then(function successCallback(response) {
            callback(true);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
})