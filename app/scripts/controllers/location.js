'use strict';

angular.module('freefootieApp')
    .controller('LocationMapCtrl', function ($scope, $resource, $routeParams) {

        var thisLocationId = parseInt($routeParams.id); 

        var teamsSrc = $resource('/api/teams/');
        var locationsSrc = $resource('/api/locations/');
        var gamesSrc = $resource('/api/games/');

        var thisLat;
        var thisLong;
        var thisName;

        google.maps.visualRefresh = true;


        locationsSrc.query(function (locations) {
            $scope.thisLocation = locations.filter(function (l) { return l.id === thisLocationId })[0];
            thisLat = locations.filter(function (l) { return l.id === 1 })[0].latitude;
            thisLong = locations.filter(function (l) { return l.id === 1 })[0].longitude;
            thisName = locations.filter(function (l) { return l.id === 1 })[0].name;
        });

      
        angular.extend($scope, {
            
            position: {
                coords: {
                    latitude: 53.568643,
                    longitude: -113.447249
                }
            },
            //function(thisLat) { return parseFloat(thisLat, 10) }
            /** the initial center of the map */
            centerProperty: {
                latitude: 53.568643,
                longitude: -113.447249
            },

            /** the initial zoom level of the map */
            zoomProperty: 14,

            /** list of markers to put in the map */
            markersProperty: [{
                latitude: 53.568643,
                longitude: -113.447249
            }],

            // These 2 properties will be set when clicking on the map
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null,

            eventsProperty: {
                click: function (mapModel, eventName, originalEventArgs) {
                    // 'this' is the directive's scope
                    $log.log("user defined event on map directive with scope", this);
                    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
                }
            }
        });
      

      

});