'use strict'

angular.module('freefootieApp')
  .directive('navigation', function ($timeout) {
    return {
      template: '<div class="navigation content"><span class="navigation title">{{title}}</span></div>',
      restrict: 'E',
      scope: {
        title: "="
      },
      link: function(scope, el, attrs) {
      }
    };
  });
