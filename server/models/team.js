var validatable = require('./validatable');

module.exports = function Team(obj){

	validatable.makeValidatable(this, {
		name: { required: true, displayName: 'Name' },
		wins: { required: false, displayName: 'Wins', defaultValue : 0 },
		losses: { required: false, displayName: 'Losses', defaultValue : 0 },
		ties: { required: false, displayName: 'Ties', defaultValue : 0 },
		division: {required: true, displayName: 'Division' },
		coach: {required: false, displayName: 'Coach'},
		phone: {required: false, displayName: 'Phone'},
		school: {required: false, displayName: 'School'},
		players: {required: false, displayName: 'Players', defaultValue: []}
	});

	if(obj)
		this.copyFrom(obj);

	this.ensureRequiredDefaults();
};
