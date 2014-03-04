'use strict';

angular.module('freefootieApp')
  .controller('LocationDetailsCtrl', function ($scope, $resource, $routeParams) {

      var Location = $resource('/api/locations/:id');
      $scope.location = Location.get({id:$routeParams.id});
      //$scope.locations = Location.query();
  });