'use strict'

angular.module('freefootieApp')
  .directive('purpleCard', function () {
  	return {
  		restrict: 'A',
      scope: false,
  		link: function(scope, el, attrs) {
        el.on('click', function(){
          el.toggleClass('visible');
        });
  		}
  	};
  });