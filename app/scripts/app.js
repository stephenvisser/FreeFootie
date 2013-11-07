'use strict';

angular.module('freefootieApp', ['ngResource', 'google-maps', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/ref/game/:id', {
        templateUrl: 'views/ref-details.html',
        controller: 'RefDetailsCtrl'
      })
      .when('/ref', {
        templateUrl: 'views/ref.html',
        controller: 'RefCtrl'
      })
       .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminCtrl'
        })
        .when('/admindetails/:id', {
            templateUrl: 'views/admin-game-details.html',
            controller: 'AdminDetailsCtl'
        })
        .when('/standings', {
            templateUrl: 'views/standings.html',
            controller: 'StandingsCtrl'
        })
        .when('/admin/team/:id', {
            templateUrl: 'views/team-details.html',
            controller: 'TeamDetailsCtrl'
        })
        .when('/admin/team', {
            templateUrl: 'views/team-admin.html',
            controller: 'TeamAdminCtrl'
        })
        .when('/scheduler', {
            templateUrl: 'views/scheduler.html',
            controller: 'SchedulerCtrl'
        })
        .otherwise({
            redirectTo: '/admin'
        });
  }).run(function($rootScope, $location){
    $rootScope.go = function(path) {
        $location.path(path);
      };
  });

