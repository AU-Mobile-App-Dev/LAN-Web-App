angular.module('lanApp')

.controller('mapProfileController', function($scope, $routeParams, profileService){
    $scope.profiles = [];
   
        
    profileService.getProfilesByLocation($routeParams.zip, function(result){
        $scope.profiles = result;
    });
    
})

