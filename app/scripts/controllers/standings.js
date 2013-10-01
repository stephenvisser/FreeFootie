'use strict';

angular.module('freefootieApp')
  .controller('StandingsCtrl', function ($scope) {

$scope.standings = {
  'North Pool': [
    {
			name: 'Ronald\'s Rhutabagas',
			wins: 5,
			losses: 3,
			ties: 0
		},
    {
      name: 'Matilda\'s Moose',
      wins: 3,
      losses: 3,
      ties: 2
    },
    {
      name: 'Dave\'s Ducks',
      wins: 0,
      losses: 5,
      ties: 3
    }
  ],
  'South Pool': [
    {
      name: 'Ronald\'s Rhutabagas',
      wins: 5,
      losses: 3,
      ties: 0
    },
    {
      name: 'Matilda\'s Moose',
      wins: 3,
      losses: 3,
      ties: 2
    },
    {
      name: 'Dave\'s Ducks',
      wins: 0,
      losses: 5,
      ties: 3
    }
  ]
  }; 

  });
