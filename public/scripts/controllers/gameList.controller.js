angular.module('lanApp')

.controller('gameListController', function($routeParams, $scope, gameListService){
    $scope.showAddGames = true;
    $scope.hasGames = false;
    $scope.ratings = ["Ridin' the hype train!", "Excellent", "Good", "Mediocre", "Meh", "Don't waste your time"];
    $scope.addingGame = false;
    $scope.addTitle = "Game Title";
    $scope.isCurrentUser = ($routeParams.username === sessionStorage.getItem('username'));
    $scope.games = [];
  
      gameListService.getGameList($routeParams.username || sessionStorage.getItem('username'), function(result){
          if(result.length >= 5){
             $scope.showAddGames = false;
          }else if(result.length > 0){
              $scope.hasGames = true;
          }
          if(Array.isArray(result)){
              $scope.games = result;
          }
           
    });
    
    $scope.addGame = function(){
        var gameObject = {
            title: $scope.addTitle,
            rating: $scope.addRating,
            summary: $scope.addSummary
        }
        gameListService.addGame(gameObject, function(result){
            if(result){
               $scope.addingGame = false;
               $scope.games.push(gameObject);
                
            }
        })
    }
    
    $scope.deleteGame = function(index, gameID){
        gameListService.deleteGame(gameID, function(result){
            if(result){$scope.games.splice(index, 1);}
        })
    }
})