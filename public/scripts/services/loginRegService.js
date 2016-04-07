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
    this.authenticateCreds = function(userObject, callback){
        $http({
            method: 'POST',
            url: uri+"/authenticate",
            data:{username: userObject.username, password:userObject.password}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
                $location.path('home');
            }
            else{
                callback(false);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
    
   this.checkSession = function(session, callback){
       
   }
   
   this.clearSession = function(){
       
   }
})