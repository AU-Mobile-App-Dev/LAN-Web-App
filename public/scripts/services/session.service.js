 angular.module('lanApp')
 
 .service('sessionService', function($http, $location, authService){
     
  this.checkSession = function(){
       $http({
            method: 'POST',
            url: uri+"/sessions/verify",
            data:{session: sessionStorage.getItem('session')}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
                //keep the session
            }
            else{
               $location.path('/');
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
               sessionStorage.removeItem('username');
               sessionStorage.removeItem( 'userID');
               sessionStorage.removeItem('session');
               sessionStorage.removeItem('avatar');
               sessionStorage.removeItem('zip');
            console.log("Session destroyed session key stored is now = " + sessionStorage.getItem('session'));
            $location.path('');

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
       
   }    
 })

   

