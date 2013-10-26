'use strict';

angular.module('freefootieApp')
.controller('TeamDetailsCtrl', function ($scope, $resource,$routeParams) {

    var currentTeamId = parseInt($routeParams.id);
    var teamsSrc = $resource('/api/teams/');

    teamsSrc.query(function (teams) {
        $scope.currentTeam = teams.filter(function (t) { return t.id === currentTeamId })[0];
    });

});
