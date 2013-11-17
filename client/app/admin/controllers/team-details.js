'use strict';

angular.module('freefootieApp')
.controller('TeamDetailsCtrl', function ($scope, $resource,$routeParams) {

    var Team = $resource('/api/teams/:id');
    var Pool = $resource('/api/pools/:id');
    var Player = $resource('/api/players/:id');

    $scope.edit = {editing: false};

    $scope.currentTeam = Team.get({id: $routeParams.id}, function(team) {
    	$scope.pool = Pool.get({id: team.pool});
    	$scope.players = team.players.map(function(player){
			return Player.get({id: player});
		});
    });
});
