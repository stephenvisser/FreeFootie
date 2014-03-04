var validatable = require('./validatable');

module.exports = function Player(obj){

	validatable.makeValidatable(this, {
		name: { required: true, displayName: 'Name' },
		number: { required: true, displayName: 'Number' },
		dob: {required: true, displayName: 'Date of Birth' }
	});

	if(obj)
		this.copyFrom(obj);

	this.ensureRequiredDefaults();
};

