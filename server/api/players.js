var repository = require('../database/players');
var Player = require('../models/player');

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

	var player = new Player(req.body);

	var saveMethod = player._id ? repository.update : repository.add;

	saveMethod(player)
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
