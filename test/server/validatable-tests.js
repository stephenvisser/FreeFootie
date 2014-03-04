var validatable = require('../../server/models/validatable');
module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    empty_object_with_no_rules_should_validate: function (test) {
        var obj = {};
        validatable.makeValidatable(obj, {});
        test.ok(obj.validate());
        test.done();
    },
    empty_object_with_missing_required_field_should_not_validate: function(test){
        var obj = {};
        validatable.makeValidatable(obj, {
            someField: { required: true, displayName: 'Some Field' }
        });

        test.ok(!obj.validate());
        test.equals(obj.getValidationErrors().length, 1);
        
        test.done();
    },
    object_with_all_required_fields_should_validate: function(test){
        var obj = {someField: 'a', someOtherField:'b'};
        validatable.makeValidatable(obj, {
            someField: {required: true, displayName: 'Some Field'},
            someOtherField: {required: true, displayName: 'Some Other Field'}
        });
        test.ok(obj.validate());
        test.equals(obj.getValidationErrors().length, 0);
        test.done();
    },
    ensureRequiredDefaults_should_set_missing_value: function(test){
        var obj = {};
        validatable.makeValidatable(obj, {
            someField: {required: true, defaultValue: []}
        });
        obj.ensureRequiredDefaults();
        test.ok(obj.someField instanceof Array);
        test.done();
    },
    ensureRequiredDefaults_should_work_with_functions: function(test){
        var obj = {};
        validatable.makeValidatable(obj, {
            someField: {required: true, defaultValue: function(){ return 777; }}
        });
        obj.ensureRequiredDefaults();
        test.equals(obj.someField, 777);
        test.done();
    },
    ensureRequiredDefaults_should_work_with_calculated_values: function(test){
        var obj = {someValue: 222};
        validatable.makeValidatable(obj, {
            someField: {required: true, defaultValue: function(o){ return o.someValue + 777; }}
        });
        obj.ensureRequiredDefaults();
        test.equals(obj.someField, 999);
        test.done();
    }
};