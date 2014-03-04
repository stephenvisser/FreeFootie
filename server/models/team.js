var validatable = require('./validatable');

module.exports = function Location(obj){

	validatable.makeValidatable(this, {
		name: { required: true, displayName: 'Name' },
		wins: { required: true, displayName: 'Wins', defaultValue : 0 },
		losses: { required: true, displayName: 'Losses', defaultValue : 0 },
		ties: { required: true, displayName: 'Ties', defaultValue : 0 },
		pool: {required: true, displayName: 'Pool' },
		coach: {required: true, displayName: 'Coach'},
		phone: {required: true, displayName: 'Phone'},
		school: {required: true, displayName: 'School'},
		players: {required: true, displayName: 'Players', defaultValue: []}
	});

	if(obj)
		this.copyFrom(obj);

	this.ensureRequiredDefaults();
};

