'use strict';

angular.module('freefootieApp')
  .controller('RefCtrl', function ($scope, $resource, $location) {

      $scope.currentGame = null;
      $scope.home = 0
      $scope.away = 0

      //NOTE: the API and sample data have not concept of people and therefore
      //not concept of referees or players. These will need to be added in order
      //to flesh this controller out properly.
      //
      var teamsSrc = $resource('/api/teams/');
      var locationsSrc = $resource('/api/locations/');
      var gamesSrc = $resource('/api/games/');

      gamesSrc.query(function(games) {
          locationsSrc.query(function(locations){
              var locationNames = {};
              locations.forEach(function (l){
                  locationNames[l.id] = l.name;
              });

              teamsSrc.query(function(teams){
                  var teamNames = {};
                  teams.forEach(function (t){
                      teamNames[t.id] = t.name;
                  });

                  games.forEach(function (g) {
                      g.location = locationNames[g.location];
                      g.time = new Date(g.time);
                      g.home = teamNames[g.home];
                      g.away = teamNames[g.away];
                  });
                  $scope.games = games.slice(0,2);
              });
          });
      });

      $scope.openDetails = function(gameId) {
        $location.path('ref/game/'+ gameId);
      }

      /*
       *  Start referee game control
       */

       function saveLocally() {
        // To-do: save in temporary storage.
       }

      // Note: Treat home like a boolean
      // Called by "+" button - checks what team.
      $scope.incrementScore = function(home) {
        if (home) {
          $scope.home = parseInt($scope.home) + 1;
        } else {
          $scope.away = parseInt($scope.away) + 1;
        }
        saveLocally();
      }

      // Called by "-" button - check what team.
      $scope.decrementScore = function(home) {
        if (home) {
          if ($scope.home > 0)
            $scope.home = parseInt($scope.home) - 1;
        } else {
          if ($scope.away > 0)
            $scope.away = parseInt($scope.away) - 1;
        }
        saveLocally();
      }

      /*
       *  End referee game control
       */
      
  });
