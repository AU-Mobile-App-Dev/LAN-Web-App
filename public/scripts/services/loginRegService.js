angular.module('lanApp')

.service('regService', function($http, $location){
    this.registerUser = function(userObject, callback){
         $http({
            method: 'POST',
            url: uri+"/register",
            data:{username: userObject.username, password:userObject.password, zip: userObject.zip, email: userObject.email}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
                $location.path('regsuccess');
            }
            else{
                console.log(response.data);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
})


.service('authService', function($http, $location){
    var currentUser;
    
    this.getCurrentUser = function(callback){
        callback(currentUser);
    }
    
    this.authenticateCreds = function(userObject, callback){
        $http({
            method: 'POST',
            url: uri+"/authenticate",
            data:{username: userObject.username, password:userObject.password}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
                currentUser = userObject.username;
                sessionStorage.setItem('key', response.data.session)
                $location.path('home');
            }
            else{
                callback(false);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
    
   this.checkSession = function(){
       $http({
            method: 'POST',
            url: uri+"/sessions/verify",
            data:{session: sessionStorage.getItem('key')}
        }).then(function successCallback(response) {
            console.log(response.data);
            if(response.data.result === "success"){
            }
            else{
                $location.path('');
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
   }
   
   this.clearSession = function(){
       sessionStorage.removeItem('key');
   }
   
})
