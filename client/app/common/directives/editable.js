'use strict'

angular.module('freefootieApp')
  .directive('editable', function ($timeout) {
  	return {
      template: '<div><div ng-transclude ng-show="!fieldEditing"></div><input class="topcoat-text-input" ng-show="fieldEditing"/></div>',
      transclude: 'element',
      replace: true,
  		restrict: 'A',
      scope: true,
  		link: function(scope, el, attrs) {
        el[0].className = "";

        var text = el.find('input')


        el.find('div').on('click', function(){
          scope.$apply(function(){
            scope.fieldEditing = true;
            $timeout(function(){
              text[0].focus();
            });
          });
        });
        text.on('blur', function() {
          scope.$apply(function() {
            scope.fieldEditing = false;
          });
        }).on('keypress', function(e){
          if(e.keyCode == 13)
          {
            text[0].blur();
            scope.$apply(function(){
              scope.$eval(attrs.editable)(text.val());
            });
            text.val('');
            return false; // returning false will prevent the event from bubbling up.
          }
          else
          {
            return true;
          }
        });
        
  		}
  	};
  });