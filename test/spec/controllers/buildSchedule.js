'use strict';

describe('Controller: BuildscheduleCtrl', function () {

  // load the controller's module
  beforeEach(module('freefootieApp'));

  var BuildscheduleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuildscheduleCtrl = $controller('BuildscheduleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
