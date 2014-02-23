var validatable = require('./validatable');

module.exports = function Pool(obj){

	validatable.makeValidatable(this, {
		name: { required: true, displayName: 'Name' }
	});

	if(obj)
		this.copyFrom(obj);

	this.ensureRequiredDefaults();
};

