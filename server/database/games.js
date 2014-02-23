var mongojs = require("mongojs");
var db = require("mongojs").connect("freefootie", ["games"]);
var ObjectId = mongojs.ObjectId;
var Q = require("q");

exports.add = function(game){
	var deferred = Q.defer();
	db.games.insert(
		organization, 
		createCallback(deferred)
	);
	return deferred.promise;
};

exports.update = function(game){
	var deferred = Q.defer();
	db.games.update(
		{_id : ObjectId(game.id)}, 
		{$set:game},
		createCallback(deferred)
	);
	return deferred.promise;
};

exports.getById = function(id){
	var deferred = Q.defer();
	db.games.findOne(
		{_id:ObjectId(id)}, 
		createCallback(deferred)
	);
	return deferred.promise;
};

function createCallback(deferred){
	return function(err, result){
		if(err)
			deferred.reject(new Error(err));
		else
			deferred.resolve(result)	
	}
}