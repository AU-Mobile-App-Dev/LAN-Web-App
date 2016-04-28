angular.module('lanApp')

.controller('messageController', function($scope, messageService, friendService){
    $scope.messages = [];
    $scope.showMessages = false;
    $scope.noMessages = true;
    var currentMessages = sessionStorage.getItem('unreadMessages');
    messageService.getMessages(function(result){
        if(result.length > 0){
             $scope.messages = result;
             $scope.showMessages = true;
             $scope.noMessages = false;
        }
         
    })
    
    $scope.deleteMessage = function(messageID){
        messageService.deleteMessage(messageID, function(result){
            if(result){
                sessionStorage.setItem('unreadMessages', currentMessages -1);
             messageService.getMessages(function(result){
                    $scope.messages = result;
                    $scope.showMessages = true;
                    $scope.noMessages = false;
                
         
            })
            }
        });
    }
    
    $scope.addFriend = function(friendName, messageID, messageArrayIndex){
        friendService.addFriend(friendName, function(result1){
            if(result1){
                sessionStorage.setItem('unreadMessages', currentMessages -1);
          messageService.deleteMessage(messageID, function(result2){
            if(result2){
                $scope.messages.splice(messageArrayIndex, 1);
             messageService.getMessages(function(result){
                    if(result.length > 0){
                        $scope.messages = result;
                        $scope.showMessages = true;
                        $scope.noMessages = false;
                    }
                
         
            })
            }
        });
            }
        })
    }
    
    
})