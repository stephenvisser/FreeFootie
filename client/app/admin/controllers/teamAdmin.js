'use strict';

angular.module('freefootieApp')
  .controller('TeamAdminCtrl', function ($scope, $resource) {

    var Team = $resource('/api/teams/:id');
    var Pool = $resource('/api/pools/:id');

    Team.query({}, function(teams) {
    	$scope.divs = teams.reduce(function(obj, team){
	    	Pool.get({id: team.pool}, function(pool){
				if (!obj[pool.name]) obj[pool.name] = [];
		    	obj[pool.name].push(team);
	    	});
	    	return obj;
	    }, {});
    });
});