angular.module('lanApp')

.controller('apiDocController', function($scope, $location){
    $scope.documentationContent = apiDocumentation;
    $scope.showExampleCode = function(){
        $location("apiDocSamples");
    }
    $scope.showErrorDoc = function(){
        $location("apiDocErrors");
    }
})

.controller('apiDocSamplesController', function($scope){
    $scope.requestDoc = sampleRequests;
    $scope.apiCalls = apiCalls;
  
})

.controller('apiDocErrorsController', function($scope){
    $scope.documentationContent = apiDocErrors;
    
})

