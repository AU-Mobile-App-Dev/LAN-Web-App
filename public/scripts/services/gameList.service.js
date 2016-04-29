angular.module('lanApp')

.service('gameListService', function($http){
    
      this.getGameList = function(username, callback){
        $http({
            method: 'POST',
            url: uri+"/gamelist",
            data:{session: sessionStorage.getItem("session"), username: username}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
     this.addGame = function(gameObject, callback){
        $http({
            method: 'POST',
            url: uri+"/gamelist/add",
            data:{session: sessionStorage.getItem("session"), 
            userID: sessionStorage.getItem('userID'), rating: gameObject.rating,
             summary: gameObject.summary, title: gameObject.title}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data.result);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
     this.editGame = function(gameObject, callback){
        $http({
            method: 'PUT',
            url: uri+"/gamelist",
            data:{session: sessionStorage.getItem("session"), 
            id: gameObject.id, rating: gameObject.rating,
             summary: gameObject.summary, title: gameObject.title}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data.result);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
     this.deleteGame = function(gameID, callback){
        $http({
            method: 'POST',
            url: uri+"/gamelist/delete",
            data:{session:sessionStorage.getItem("session"), id: gameID}
        }).then(function successCallback(response) {
            console.log(response.data);
            callback(response.data.result);

        }, function errorCallback(response) {
            callback(false);
            console.error(response.data);
        });
    }
    
    
    
})