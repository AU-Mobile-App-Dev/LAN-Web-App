angular.module('lanApp')

.directive('navbarDirective', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'navbar.html'
      }
    });