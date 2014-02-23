var validatable = require('./validatable');

module.exports = function Game(obj){

	validatable.makeValidatableModel(this, {
		location: { required: true, displayName: 'Location' },
		date: { required: true, displayName: 'Date' },
		home: {required: true, displayName: 'Home Team' },
		away: { required: true, displayName: 'Away Team' },
		state: { required: false, displayName: 'State', defaultValue: null}
	});

	if(obj)
		this.copyFrom(obj);

	this.ensureRequiredDefaults();

};

