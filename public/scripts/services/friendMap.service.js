angular.module('lanApp')

.service('friendMapService', function($http){
   
    this.populateMap = function(callback){
        $http({
            method: 'POST',
            url: uri+"/users/location/count",
            data:{session: sessionStorage.getItem('session'), zip:sessionStorage.getItem('zip')}
        }).then(function successCallback(response) {
               drawMap(response.data);
           
            callback(true);

        }, function errorCallback(response) {
            
            console.error(response.data);
        });
    }
    
    
    var drawMap = function(userMarkerArray) {
        console.log(userMarkerArray);
        var map;
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: parseFloat(userMarkerArray[0].lat), lng: parseFloat(userMarkerArray[0].lng)},
         zoom: 10
        });
     
     var infowindow = new google.maps.InfoWindow;

    var marker, i;

    for (i = 0; i < userMarkerArray.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(userMarkerArray[i].lat), parseFloat(userMarkerArray[i].lng)),
            map: map
        });
          
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent("<p class=infowindow>" + userMarkerArray[i].users + " LAN user(s) here!</p><a href=#/profiles/zip/" +
                userMarkerArray[i].zip + ">Click here to see them</a>");
                infowindow.open(map, marker);
            }
        })(marker, i));
        }
    }
})
  
        