var validatable = require('./validatable');

module.exports = function Location(obj){

	validatable.makeValidatable(this, {
		name: { required: true, displayName: 'Name' },
		address: {required: false, displayName: 'Address'},
		latitude: { required: true, displayName: 'Latitude' },
		longitude: {required: true, displayName: 'Longitude' }
	});

	if(obj)
		this.copyFrom(obj);

	this.ensureRequiredDefaults();
};

