'use strict';

angular.module('freefootieApp')
  .controller('SchedulerCtrl', function ($scope, $resource) {

        var Team = $resource('/api/teams/:id');

        $scope.startDate = null;

        $scope.createSchedule = function() {

            Team.query(function(teams){
                $scope.weeks = rrSchedule(teams.length).map(function(games, index){
                    var round = new Date(Date.parse($scope.startDate));
                    round.setDate(round.getDate() + 7 * index);
                    return {
                        games: games.map(function(game){
                            console.log(game);
                            return {
                                home: teams[game.home - 1],
                                away: teams[game.away - 1],
                                date: round
                            };
                        }),
                        date: round
                    };
                });
            });

            var round = 0;

        };


        var rrSchedule = function(teams) {
            var schedule = []
                , arraySize = +teams + (teams % 2)
                , a = new Array(arraySize - 1)
                , arrayLength = a.length
                , pos
                , i
                , result = Array.apply(null, {length: arrayLength})
                , x
                , pos2;

            for (x = arraySize - 1; x >= 0; x--)
            {
                a[x] = (x + 1);
            }


            // if we added one extra team for the round robin
            // change the extra team to something else.
            if (arraySize - teams == 1) {
                a[arraySize - 1] = "_";
            }

            return result.map(function(_, round){
                //initial team
                var array = [{
                        home: a[0],
                        away: a[arrayLength - round]
                    }];
                                //other games
                for (i = 2; i < (arraySize / 2) + 1; i++) {

                    if (i + (round - 1) >= arrayLength) {
                        pos = (arrayLength - (i + (round - 1))) * -1;
                    }
                    else {
                        pos = i + (round - 1);
                    }

                    pos2 = (pos - (round - 1)) - round - 1;


                    if (pos2 > 0) {
                        pos2 = (arrayLength - pos2) * -1;
                    }

                    if (pos2 < arrayLength * -1) {
                        pos2 += arrayLength;
                    }

                    array.push({
                        home: a[(arrayLength + pos2)],
                        away: a[(arrayLength - pos)]
                    });
                }
                return array;
            });
        };

  });
