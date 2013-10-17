'use strict';

angular.module('freefootieApp')
    .controller('LocationMapCtrl', function ($scope, $resource, $routeParams, $log) {

        var thisLocationId = parseInt($routeParams.id); 

        var locationsSrc = $resource('/api/locations/');

        google.maps.visualRefresh = true;


        locationsSrc.query(function (locations) {
            $scope.thisLocation = locations.filter(function (l) { return l.id === thisLocationId })[0];
        });

      
        angular.extend($scope, {
            
            position: {
                coords: {
                    latitude: 53.568643,
                    longitude: -113.447249
                }
            },

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
