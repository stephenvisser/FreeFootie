'use strict'

angular.module('freefootieApp')
  .directive('property', function ($compile) {
  	return {
      template: '<label class="property">{{title}}:</label>',
  		restrict: 'E',
      scope: {
        title: "@",
        model: "=",
        options: "@"
      },
  		link: function(scope, el, attrs) {
        if(scope.options) {
          var control = $compile('<select ng-model="' + attrs.model + '" ng-options="'+ scope.options + '"></select>')(scope.$parent);
        } else {
          var control = $compile('<input class="property" type="text" ng-model="model"/>')(scope);
        }
        el.append(control);
  		}
  	};
  });
