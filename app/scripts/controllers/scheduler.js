'use strict';

angular.module('freefootieApp')
  .controller('SchedulerCtrl', function ($scope) {

        $scope.games = [];

        $scope.createSchedule = function() {

            var res = $scope.rrSchedule($scope.formTeamsNr);

            for(var i = 0; i < res.length; i++)
            {
                $scope.games.push({round: res[i].round , homeTeam:  res[i].homeTeam,  awayTeam: res[i].awayTeam });
            }

        };


        $scope.rrSchedule = function(teams) {
            var schedule = []
                , arraySize = +teams + (teams % 2)
                , a = new Array(arraySize - 1)
                , arrayLength = a.length
                , pos
                , i
                , round
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

            for (round = 1; round < arrayLength + 1; round++) {

                //First game = first team x last not "played" (can be team "_")
                schedule.push({
                        round: round,
                        homeTeam: a[0],
                        awayTeam: a[arrayLength - (round - 1)]}
                );

                //other games
                for (i = 2; i < (arraySize / 2) + 1; i++) {

                    if (i + (round - 2) >= arrayLength) {
                        pos = (arrayLength - (i + (round - 2))) * -1;
                    }
                    else {
                        pos = i + (round - 2);
                    }

                    pos2 = (pos - (round - 2)) - round;


                    if (pos2 > 0) {
                        pos2 = (arrayLength - pos2) * -1;
                    }

                    if (pos2 < arrayLength * -1) {
                        pos2 += arrayLength;
                    }

                    schedule.push({
                        round: round,
                        homeTeam: a[(arrayLength + pos2)],
                        awayTeam: a[(arrayLength - pos)]
                    })
                }

            }

            return schedule;
        };

  });
