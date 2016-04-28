angular.module('lanApp')

.service('newsfeedService', function($http, $location, friendService){
    
    this.getNewsfeed = function(callback){
        friendService.getFriendIDs(function(friendIDs){
            $http({
            method: 'POST',
            url: uri+"/newsfeed",
            data:{session: sessionStorage.getItem("session"), userID: sessionStorage.getItem("userID"), friendIDs: friendIDs}
        }).then(function successCallback(response) {
             localStorage["storedNewsfeed"] = JSON.stringify(response.data);
            callback(response.data);

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
        })
         
    }
    
    this.postNews = function(message, callback){
         $http({
            method: 'PUT',
            url: uri+"/newsfeed/add",
            data:{session: sessionStorage.getItem("session"), message: message}
        }).then(function successCallback(response) {
            callback(true);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    this.deleteNews = function(id){
        console.log("Delete post id: " + id);
        $http({
            method: 'PUT',
            url: uri+"/newsfeed/delete",
            data:{session: sessionStorage.getItem('session'), newsfeedID: id}
        }).then(function successCallback(response) {
          

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
    
    this.likePost = function(postID, userID, callback){
        $http({
            method: 'POST',
            url: uri+"/newsfeed/like",
            data:{session: sessionStorage.getItem('session'), newsfeedID: id, userID: userID}
        }).then(function successCallback(response) {
          callback(response.result);

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
})