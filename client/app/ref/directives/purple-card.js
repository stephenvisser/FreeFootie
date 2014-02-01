'use strict'

angular.module('freefootieApp')
  .directive('purpleCard', function () {
  	return {
      restrict: 'E',
      scope: {
        commit: '&'
      },
      template: '<div class="good-behaviour-tab" ng-click="show()" ng-class="{waving: visible, entering: entering}">'
                +'<div class="card-content">'
                  +'<h1>PURPLE CARD</h1>'
                  +'<button ng-click="cycle(); $event.stopPropagation();" class="down-btn">+</button>'
                  +'<button ng-click="cycle(); $event.stopPropagation();" class="hide-btn">X</button>'
                  +'<div>'
                  +'<form class="card-form">'
                  +'<input type="text" class="topcoat-text-input" placeholder="player #" ng-model="playerNumber" ng-click="$event.stopPropagation()"/>'
                   + '<button class="topcoat-button" ng-click="add($event, playerNumber);">Add</button>'
                  +'</form>'
                +'</div>',
      replace: true,
  		link: function($scope, el, attrs) {

        $scope.visible = false;
        $scope.entering = false;

        $scope.show = function(){
          $scope.visible=true;
          $scope.entering=false;
        };

        $scope.cycle = function(e){
          $scope.visible = false;
          $scope.entering=!$scope.entering;
        };

        $scope.add = function(e, playerNumber){
          if(playerNumber!=null && playerNumber!=''){
            $scope.commit()(playerNumber);
            $scope.entering=false;
            $scope.playerNumber=null;
          }
          e.stopPropagation();
        };
  		}
  	};
  });