'use strict';

angular.module('freefootieApp')
  .controller('LocationCtrl', function ($scope, $resource) {

      var Location = $resource('/api/locations/:id');
      $scope.locations = Location.query();
  });