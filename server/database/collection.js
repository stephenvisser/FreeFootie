var mongojs = require("mongojs");
var db = require("mongojs").connect("freefootie", ["players"]);
var ObjectId = mongojs.ObjectId;
var Q = require("q");
var Player = require('../models/player');

module.exports = function(collectionName){
	
	var collection = db[collectionName];

	this.add = function(item, callback){
		collection.insert(item, callback);
	};

	this.update = function(item, callback){
		collection.update(
			{_id : convertToDbId(item.id)}, 
			{$set:item},
			callback
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
	return id;//return ObjectId(id);
}