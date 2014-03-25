var mongojs = require("mongojs");
var db = require("mongojs").connect("freefootie", 
	["games", "locations", "players", "pools", "teams"]);
var ObjectId = mongojs.ObjectId;
var Q = require("q");

module.exports = function(collectionName){
	
	var collection = db[collectionName];

	this.insert = function(item, callback){
		collection.insert(item,
			function(err, results){
				var single = (results && results.length) ? results[0]:null;
				callback(err, single);
			});
	};

	this.update = function(item, callback){
		collection.update(
			{_id : convertToDbId(item.id)}, 
			{$set:item},
			function(err){
				callback(err, item);
			}
		);
	};

	this.getById = function(id, callback){
		collection.findOne( {_id : convertToDbId(id)}, callback);
	};

	this.getAll = function(callback){
		collection.find( callback );
	};

}

function convertToDbId(id){
	if(isNaN(id))
		return ObjectId(id);
	return id;//return ObjectId(id);
}