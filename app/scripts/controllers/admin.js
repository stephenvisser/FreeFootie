'use strict';

angular.module('freefootieApp')
  .controller('AdminCtrl', function ($scope) {

$scope.games = [
  		{
  			location: 'St Mary\'s',
  			time: new Date(),
  			home: 'Timmy\'s Tigers',
  			away: 'Bobby\'s Brontasauruses',
  			state: null
  		},
      {
        location: 'Downtown Core',
        time: new Date(),
        home: 'Susan\'s Ostriches',
        away: 'Ronald\'s Rhutabagas',
        state: 'inprogress'
      },
      {
        location: 'Margaret Millie',
        time: new Date(),
        home: 'Matilda\'s Moose',
        away: 'Dave\'s Ducks',
        state: 'complete'
      },
  	]; 

  });
