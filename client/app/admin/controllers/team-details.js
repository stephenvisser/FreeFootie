'use strict';

angular.module('freefootieApp')
.controller('TeamDetailsCtrl', function ($scope, $resource, $routeParams) {

    var Team = $resource('/api/teams/:id');
    var Division = $resource('/api/divisions/:id');
    var Player = $resource('/api/players/:id');

    $scope.edit = {editing: false};

    var teamCheckpoint = $scope.currentTeam = Team.get({id: $routeParams.id}, function(team) {
      teamCheckpoint = angular.copy(team);
    	$scope.division = Division.get({id: team.division});
    	$scope.players = (team.players || []).map(function(player){
			return Player.get({id: player});
		});

    $scope.$watch('currentTeam', function(newVal) {
      $scope.needsSave = !angular.equals(newVal, teamCheckpoint);
    }, true);

    $scope.divisions = Division.query();

    $scope.update = function(team) {
      team.$save();
    }

    $scope.cancel = function() {
      angular.copy(teamCheckpoint, $scope.currentTeam);
    }

  });
});
