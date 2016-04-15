angular.module("lanApp")

.controller('friendMapController', function($scope, $location, friendMapService, sessionService){
    sessionService.checkSession(function(result){
    if(result){
        $scope.showLoading = true;
        friendMapService.populateMap(function(result){
           $scope.showLoading = false;
        });
    }
    else{
        $location.path('');
    }
    })
})
    