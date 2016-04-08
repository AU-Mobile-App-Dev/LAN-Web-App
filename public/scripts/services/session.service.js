 angular.module('lanApp')
 
 .service('sessionService', function($http, $location, authService){
     
  this.checkSession = function(){
       $http({
            method: 'POST',
            url: uri+"/sessions/verify",
            data:{session: sessionStorage.getItem('key')}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
            }
            else{
                $location.path('');
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
   }
   
   this.destroySession = function(){
       var userID = authService.getCurrentUser().userID;
       $http({
            method: 'POST',
            url: uri+"/sessions/destroy",
            data:{userID: userID}
        }).then(function successCallback(response) {
            sessionStorage.removeItem('key');
            console.log("Session destroyed session key stored is now = " + sessionStorage.getItem('key'));
            $location.path('login');

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
       
   }    
 })

   

