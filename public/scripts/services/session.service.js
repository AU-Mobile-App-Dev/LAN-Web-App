 angular.module('lanApp')
 
 .service('sessionService', function($http, $location, authService){
     
  this.checkSession = function(callback){
       $http({
            method: 'POST',
            url: uri+"/sessions/verify",
            data:{session: sessionStorage.getItem('session')}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
                callback(true);
            }
            else{
                callback(false);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
   }
   
   this.destroySession = function(){
       $http({
            method: 'POST',
            url: uri+"/sessions/destroy",
            data:{userID: sessionStorage.getItem('userID')}
        }).then(function successCallback(response) {
            sessionStorage.removeItem('username', response.data.username);
               sessionStorage.removeItem( 'userID', response.data.userID);
               sessionStorage.removeItem('session',  response.data.session);
               sessionStorage.removeItem('avatar', response.data.avatar);
            console.log("Session destroyed session key stored is now = " + sessionStorage.getItem('session'));
            $location.path('');

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
       
   }    
 })

   

