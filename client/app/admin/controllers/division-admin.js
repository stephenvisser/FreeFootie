'use strict';

angular.module('freefootieApp')
  .controller('DivisionAdminCtrl', function ($scope, $resource) {
    var Division = $resource('/api/divisions/:id');
    var divisionCheckpoint = $scope.divs = Division.query({}, function(divs){
      divisionCheckpoint = angular.copy(divs);
    });

    $scope.cancel = function() {
      angular.copy(divisionCheckpoint, $scope.divs);
    }

    $scope.update = function() {
        $scope.divs.forEach(function(div) {
          div.$save();
        });
    }

    $scope.$watch('divs', function(newDiv){
      $scope.needsSave = !angular.equals(newDiv, divisionCheckpoint);
    }, true);
  });
