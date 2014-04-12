'use strict';

angular.module('freefootieApp')
  .controller('TeamAdminCtrl', function ($scope, $resource) {

    var Team = $resource('/api/teams/:id');
    var Pool = $resource('/api/pools/:id');

    Pool.query({}, function(pools){
        $scope.pools = pools.reduce(function(obj, pool){
          obj[pool._id] = pool;
          return obj;
        }, {});
    });

    function update() {
      Team.query({}, function(teams) {
      	$scope.divs = teams.reduce(function(obj, team){
  	    	Pool.get({id: team.pool}, function(pool){
  				if (!obj[pool._id]) obj[pool._id] = [];
  		    	obj[pool._id].push(team);
  	    	});
  	    	return obj;
  	    }, {});
      });
    }

    update();

    $scope.add = function(name, division) {
      Team.save({
        name: name,
        pool: division
      }).$promise.then(update);
    }
});
