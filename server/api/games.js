var games = require('../database/games');

exports.get = function(req, res){
	var id = req.params.id;
	if(id)
	{
		games.getById(id).then(
			function(result){
				res.json(result);
			},
			createErrorCallback(res));
	}
	else{
		games.getAll()
			.then(
				function(results){
					res.json(results);
				}, 
				createErrorCallback(res));
	}
};

function createErrorCallback(res){
	return function(error){
		res.send(500, 'Oops, something bad happened:'+error);
	}
}