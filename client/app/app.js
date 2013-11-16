'use strict';

angular.module('freefootieApp', ['ngResource', 'google-maps', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/ref/game/:id', {
        templateUrl: 'app/views/ref-details.html',
        controller: 'RefDetailsCtrl'
      })
      .when('/ref', {
        templateUrl: 'app/views/ref.html',
        controller: 'RefCtrl'
      })
       .when('/team', {
        templateUrl: 'app/views/team.html',
        controller: 'TeamCtrl'
      })
        .when('/admin', {
            templateUrl: 'app/views/admin.html',
            controller: 'AdminCtrl'
        })
        .when('/admindetails/:id', {
            templateUrl: 'app/views/admin-game-details.html',
            controller: 'AdminDetailsCtl'
        })
        .when('/standings', {
            templateUrl: 'app/views/standings.html',
            controller: 'StandingsCtrl'
        })
        .when('/admin/team/:id', {
            templateUrl: 'app/views/team-details.html',
            controller: 'TeamDetailsCtrl'
        })
        .when('/admin/team', {
            templateUrl: 'app/views/team-admin.html',
            controller: 'TeamAdminCtrl'
        })
        .when('/scheduler', {
            templateUrl: 'app/views/scheduler.html',
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

