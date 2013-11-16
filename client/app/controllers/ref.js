'use strict';

angular.module('freefootieApp')
  .controller('RefCtrl', function ($scope, $resource, $location) {

      var Game = $resource('/api/games/:id');
      var Location = $resource('/api/locations/:id');
      var Team = $resource('/api/teams/:id');

      $scope.locationMap = {};
      $scope.teamMap = {};

      $scope.games = Game.query({date: new Date().toISOString()}, function(games){
        games.forEach(function(game){
          game._location = Location.get({id: game.location});
          game._away = Team.get({id: game.away});
          game._home = Team.get({id: game.home});
        })
      });
  });
