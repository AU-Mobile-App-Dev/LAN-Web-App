angular.module('lanApp')

.service('friendService', function($http){
    this.sendRequest = function(friendID, callback){
        $http({
            method: 'POST',
            url: uri+"/friends/request",
            data:{session: sessionStorage.getItem("session"),
             username: sessionStorage.getItem('username'), 
             friendID: friendID, message:sessionStorage.getItem('username') +" wants to be friends!" }
        }).then(function successCallback(response) {
                  callback(true);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    this.addFriend = function(friendName, callback){
        $http({
            method: 'POST',
            url: uri+"/friends/add",
            data:{session: sessionStorage.getItem("session"), username: sessionStorage.getItem('username'), friendName: friendName}
        }).then(function successCallback(response) {
            callback(true);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    this.getFriends = function(callback){
        $http({
            method: 'POST',
            url: uri+"/friends",
            data:{session: sessionStorage.getItem("session"), userID: sessionStorage.getItem('userID')}
        }).then(function successCallback(response) {
            callback(response.data);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    this.getFriendIDs = function(callback){
        $http({
            method: 'POST',
            url: uri+"/friends/getIDs",
            data:{session: sessionStorage.getItem("session"), userID: sessionStorage.getItem('userID')}
        }).then(function successCallback(response) {
            var friendIDArray = [];
            for(i in response.data){
                friendIDArray.push(response.data[i].friend_id);
            }
            callback(friendIDArray);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
})