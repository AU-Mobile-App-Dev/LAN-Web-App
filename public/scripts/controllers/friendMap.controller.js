angular.module("lanApp")

.controller('friendMapController', function($scope, $location, friendMapService, sessionService){
    sessionService.checkSession(function(result){
    if(result){
        friendMapService.populateMap(function(result){
           
        });
    }
    else{
        $location.path('');
    }
    })
})
    