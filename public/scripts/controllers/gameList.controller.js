angular.module('lanApp')

.controller('gameListController', function($routeParams, $scope, gameListService){
    $scope.showAddGames = true;
    $scope.hasGames = false;
    
    $scope.addingGame = false;
    $scope.addTitle = "Game Title";
    $scope.games = [];
  
      gameListService.getGameList($routeParams.username, function(result){
          if(result.length >= 5){
             $scope.showAddGames = false;
          }else if(result.length > 0){
              $scope.hasGames = true;
          }
          if(Array.isArray(result)){
              $scope.games = result;
          }
           
    });
    
    
})