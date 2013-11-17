'use strict';

angular.module('freefootieApp')
    .controller('LocationMapCtrl', function ($scope, $resource, $routeParams, $log) {


        var Location = $resource('/api/locations/:id');

        google.maps.visualRefresh = true;

        $scope.location = Location.get({id: $routeParams.id}, function (location) {
            //copy values to center. this object is modified
            //when map is dragged!
            $scope.center = {
                latitude: location.latitude,
                longitude: location.longitude
            };
        });
});
