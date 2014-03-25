'use strict';

angular.module('freefootieApp')
  .controller('LocationDetailsCtrl', function ($scope, $resource, $routeParams) {
      	var Location = $resource('/api/locations/:id');

	  	var idParam = $routeParams.id;
	  	if(idParam!='new'){
	      $scope.location = Location.get({id:$routeParams.id});
	  	}
	  	else{
	  		$scope.location = new Location();
	  	}

	  	$scope.save = function(){
	  		$scope.location.$save();
	  	};
      //$scope.locations = Location.query();
  });