'use strict';

angular.module('freefootieApp')
  .controller('AdminDetailsCtl', function ($scope, $routeParams, $resource) {

  	var Game = $resource('/api/games/:id');
  	var Location = $resource('/api/locations/:id');
  	var Team = $resource('/api/teams/:id');

  	$scope.game = Game.get({id: $routeParams.id}, function(item) {
	  	$scope.location = Location.get({id: item.location});
	  	$scope.home = Team.get({id: item.home});
	  	$scope.away = Team.get({id: item.away});
  	});
  });