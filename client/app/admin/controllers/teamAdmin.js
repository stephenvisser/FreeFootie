'use strict';

angular.module('freefootieApp')
  .controller('TeamAdminCtrl', function ($scope, $resource) {

    var Team = $resource('/api/teams/:id');
    var Division = $resource('/api/divisions/:id');

    Division.query({}, function(divisions){
        $scope.divisions = divisions.reduce(function(obj, division){
          obj[division._id] = division;
          return obj;
        }, {});
    });

    function update() {
      Team.query({}, function(teams) {
      	$scope.divs = teams.reduce(function(obj, team){
  	    	Division.get({id: team.division}, function(division){
  				if (!obj[division._id]) obj[division._id] = [];
  		    	obj[division._id].push(team);
  	    	});
  	    	return obj;
  	    }, {});
      });
    }

    update();

    $scope.add = function(name, division) {
      Team.save({
        name: name,
        division: division
      }).$promise.then(update);
    }
});
