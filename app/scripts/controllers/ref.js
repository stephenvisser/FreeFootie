'use strict';

angular.module('freefootieApp')
  .controller('RefCtrl', function ($scope, $resource, $location) {

      var Game = $resource('/api/games/:id');

      $scope.Location = $resource('/api/locations/:id');
      $scope.Team = $resource('/api/teams/:id');
      
      $scope.games = Game.query({date: new Date().toISOString()});
  });
