angular.module('lanApp')

.service('authService', function($http, $location){
    
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
    
  
