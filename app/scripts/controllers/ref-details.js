'use strict';

angular.module('freefootieApp')
  .controller('RefDetailsCtrl', function ($scope, $routeParams, $resource) {
      var Team = $resource('/api/teams/:id');
      var Location = $resource('/api/locations/:id');
      var Game = $resource('/api/games/:id');

      $scope.game = Game.get({id:$routeParams.id}, function(game){
        $scope.location = Location.get({id: game.location});
        $scope.away = Team.get({id: game.away});
        $scope.home = Team.get({id: game.home});
      });

      $scope.game = {location: 'Ottowel', date: new Date()};
      $scope.score = {home: 0,
      away: 0};

       function saveLocally() {
        // To-do: save in temporary storage.
       }


       $scope.abs = function (num) {
        return num < 0 ? 0 : num;
       }
  });
