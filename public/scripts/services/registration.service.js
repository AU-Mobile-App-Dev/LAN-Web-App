angular.module('lanApp')

.service('regService', function($http, $location){
    this.registerUser = function(userObject, callback){
         $http({
            method: 'POST',
            url: uri+"/register",
            data:{username: userObject.username, password:userObject.password, zip: userObject.zip, email: userObject.email}
        }).then(function successCallback(response) {
            if(response.data.result === "success"){
                $location.path('regSuccess');
            }
            else{
                console.log(response.data);
            }

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
})