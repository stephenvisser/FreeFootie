var repository = require('../database/games');
var Game = require('../models/game');

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
	var props = copyPropertiesToObject(req.body, 
		['id', 'location', 'date', 'home', 'away', 'state']);

	var saveMethod = props.id ? repository.update : repository.add;

	saveMethod(new Game(props))
		.then(function(result){
			res.json(result);
		}, function(error){
			res.send(500, 'Oops, something bad happened:'+error);
		});		
};

function copyPropertiesToObject(from, properties){
	var obj = {};
	properties.forEach(function(name){
		if(typeof from[name] !== 'undefined')
			obj[name]=from[name];
	});
	return obj;
}

function createErrorCallback(res){
	return function(error){
		res.send(500, 'Oops, something bad happened:'+error);
	}
}