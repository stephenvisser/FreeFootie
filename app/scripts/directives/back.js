'use strict'

angular.module('freefootieApp')
  .directive('back', function ($window) {
  	return {
  		restrict: 'A',
      scope: false,
  		link: function(scope, el, attrs) {
        el.on('click', function(){
          $window.history.back();
        });
  		}
  	};
  });