'use strict';

angular.module('freefootieApp')
  .controller('RefCtrl', function ($scope) {

    $scope.currentGame = null;

  	$scope.games = [
  		{
  			location: 'St Mary\'s',
  			time: new Date(),
  			home: 'Timmy\'s Tigers',
  			away: 'Bobby\'s Brontasauruses'
  		},
      {
        location: 'Downtown Core',
        time: new Date(),
        home: 'Susan\'s Ostriches',
        away: 'Ronald\'s Rhutabagas'
      }
  	]; 
  });
