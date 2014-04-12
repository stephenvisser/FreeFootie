'use strict';

angular.module('freefootieApp')
  .controller('GameDetailsCtrl', function ($scope, $routeParams, $resource) {

  	var Game = $resource('/api/games/:id');
  	var Location = $resource('/api/locations/:id');
  	var Team = $resource('/api/teams/:id');

    $scope.locations = Location.query();
    $scope.teams = Team.query();

    $scope.home=null;
    $scope.away=null;

    $scope.updateTeams=function(){
      $scope.home = getTeamById($scope.game.home);
      $scope.away = getTeamById($scope.game.away);
    };

    function getTeamById(id){
      for(var i=0; i<$scope.teams.length; i++){
        var team = $scope.teams[i];
        if(team.id==id)
          return team;
      }
      return null;
    }

  	$scope.game = Game.get({id: $routeParams.id}, function(item) {
	  	//$scope.location = Location.get({id: item.location});
  
      //TEMP WORKAROUND FOR SAMPLE DATA USING MIX OF NUMBERS AND STRINGS..
      if(item.location)
        item.location+='';

      if(item.home)
      item.home+='';

      if(item.away)
        item.away+='';
      //END WORKAROUND

      $scope.updateTeams();
    	//$scope.home = Team.get({id: item.home});
	  	//$scope.away = Team.get({id: item.away});
  	});

      $scope.save = function(){
        $scope.game.$save();
      };
  });