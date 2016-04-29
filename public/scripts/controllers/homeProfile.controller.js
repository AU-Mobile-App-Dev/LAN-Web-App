angular.module('lanApp')

.controller('homeProfileController', function($scope, gameListService){
    $scope.username = sessionStorage.getItem('username');
    $scope.userAvatar = sessionStorage.getItem('avatar');
    $scope.showAddGames = true;
    
    $scope.games = [];
  
      gameListService.getGameList(sessionStorage.getItem('username'), function(result){
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