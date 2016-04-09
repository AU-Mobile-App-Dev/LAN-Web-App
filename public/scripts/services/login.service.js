angular.module('lanApp')

.service('authService', function($http, $location){
    var currentUser = {};
    
    this.getCurrentUser = function(){
       return currentUser;
    }
    
    this.authenticateCreds = function(userObject, callback){
        $http({
            method: 'POST',
            url: uri+"/authenticate",
            data:{username: userObject.username, password:userObject.password}
        }).then(function successCallback(response) {
            if(response.data.result){
                currentUser.username = response.data.username;
                currentUser.userID = response.data.userID;
                sessionStorage.setItem('key', response.data.session)
                $location.path('home');
                console.log("User logged in, session key= "+response.data.session);
            }
            else{
                callback(false);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
})
    
  
