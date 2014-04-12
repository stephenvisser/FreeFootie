
exports.makeValidatable = function(obj, validationRules){

	var validationErrors = [];

	obj.validate = function(){
		validationErrors = validate(obj, validationRules);
		return validationErrors.length===0;
	};

	obj.getValidationErrors = function(){
		return validationErrors;
	};

	//uses validation rules to set default values on model
	obj.ensureRequiredDefaults = function(){
		ensureRequiredDefaults(obj, validationRules);
	};

	obj.copyFrom = function(from){
		for(var prop in from){
			if(prop=='_id') {
				obj._id = from._id;
			}
			else if(validationRules[prop])
				obj[prop]=from[prop];
		}
	};

};

function ensureRequiredDefaults(object, validationRules){
	Object.keys(validationRules).forEach(function(key){
		var rule = validationRules[key];
		if(rule.required && object[key] == null && rule.defaultValue != null)
		{
			if(typeof rule.defaultValue=='function')
				object[key]=rule.defaultValue(object);
			else
				object[key]=rule.defaultValue;
		}
	})
};

function validate(object, validationRules){
	var requiredFieldErrors = evaluateRequiredFields(object, validationRules);
	var propertyValidationErrors = evaluatePropertyRules(object, validationRules);
	return requiredFieldErrors.concat(propertyValidationErrors);
};

function evaluateRequiredFields(object, validationRules){
	var validationErrors = [];
	Object.keys(validationRules).forEach(function(key){
		var rule = validationRules[key];
		if(rule.required && object[key] == null)
			validationErrors.push(rule.displayName+' is required.');
	});
	return validationErrors;
}

function evaluatePropertyRules(object, validationRules){
	var validationErrors = [];
	Object.keys(validationRules).forEach(function(key){
		var value = object[key];
		if(validationRules[key].validate){
			validationErrors = validationErrors.concat(validationRules[key].validate(value));
		}
	});
	return validationErrors;
}
