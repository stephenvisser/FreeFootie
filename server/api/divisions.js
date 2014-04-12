var repository = require('../database/divisions');
var Division = require('../models/division');

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

	var division = new Division(req.body);

	var saveMethod = division._id ? repository.update : repository.add;

	saveMethod(division)
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
