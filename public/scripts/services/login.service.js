angular.module('lanApp')

.service('authService', function($http, $location, friendService, newsfeedService){
    
    this.authenticateCreds = function(userObject, callback){
        $http({
            method: 'POST',
            url: uri+"/authenticate",
            data:{username: userObject.username, password:userObject.password}
        }).then(function successCallback(response) {
            if(response.data.result){
               sessionStorage.setItem('username', response.data.username);
               sessionStorage.setItem( 'userID', response.data.userID);
               sessionStorage.setItem('session',  response.data.session);
               sessionStorage.setItem('avatar', response.data.avatar);
               sessionStorage.setItem('zip', response.data.zip);
               
               friendService.getFriends(function(result){
                       $location.path('home');
               });
               
            }
            else{
                callback(false);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
})
    
  
