var repository = require('../database/locations');
var Location = require('../models/location');

exports.get = function(req, res){
	var id = req.params.id;
	if(id)
	{
		repository.getById(id).then(
			function(result){
				res.json(result);
			},
			createErrorCallback(res));
	}
	else{
		repository.getAll()
			.then(
				function(results){
					res.json(results);
				}, 
				createErrorCallback(res));
	}
};

exports.save = function(req, res){

	var location = new Location(req.body);

	var saveMethod = location.id ? repository.update : repository.add;

	saveMethod(location)
		.then(function(result){
			res.json(result);
		}, function(error){
			res.send(500, 'Oops, something bad happened:'+error);
		});		
};

function createErrorCallback(res){
	return function(error){
		res.send(500, 'Oops, something bad happened:'+error);
	}
}