'use strict';

angular.module('freefootieApp')
  .controller('TeamCtrl', function ($scope) {

  	$scope.games = [
  		{
  			location: 'St Mary\'s',
  			time: new Date(),
  			home: 'Timmy\'s Tigers',
  			away: 'Bobby\'s Brontasauruses',
  			transportation: 'Walking'
  		},
      {
        location: 'Downtown Core',
        time: new Date(),
        home: 'Susan\'s Ostriches',
        away: 'Timmy\'s Tigers',
        transportation: 'Bus'
      }
  	]; 
  });
