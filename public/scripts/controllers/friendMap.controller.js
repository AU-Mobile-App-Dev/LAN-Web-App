angular.module("lanApp")

.controller('friendMapController', function($scope, $location, friendMapService){
    
        $scope.showLoading = true;
        friendMapService.populateMap(function(result){
           $scope.showLoading = false;
        });
   
})
    