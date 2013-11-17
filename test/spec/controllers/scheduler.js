'use strict';

describe('Controller: SchedulerCtrl', function () {

  // load the controller's module
  beforeEach(module('freefootieApp'));

  var SchedulerCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchedulerCtrl = $controller('SchedulerCtrl', {
      $scope: scope
    });
  }));

  it('should attach an empty startDate', function () {
    expect(scope.startDate).toBeDefined();
  });

  it('should attach a create schedule function', function () {
    expect(scope.createSchedule).toBeDefined();

    expect((typeof scope.createSchedule) === 'function').toBe(true);
  });
});
