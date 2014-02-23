var Location = require('../models/location');
var collection = new (require('./collection'))('locations');
var mapper = require('./mapper');
var Q = require("q");

exports.add = function(item){
	var deferred = Q.defer();

	if(!item.validate())
		deferred.reject(new Error('Invalid location:'+item.getValidationErrors().join('|')));
	else
		collection.insert( item, mapper.mapCallbackToPromise(deferred, Location) );
	
	return deferred.promise;
};

exports.update = function(item){
	var deferred = Q.defer();

	if(!item.validate())
		deferred.reject(new Error('Invalid location:'+item.getValidationErrors().join('|')));
	else
		collection.update( item, mapper.mapCallbackToPromise(deferred, Location) );
	
	return deferred.promise;
};

exports.getById = function(id){
	var deferred = Q.defer();
	collection.getById( id, mapper.mapCallbackToPromise(deferred, Location) );
	return deferred.promise;
};

exports.getAll = function(){
	var deferred = Q.defer();
	collection.getAll( mapper.mapCallbackToPromise(deferred, Location) );
	return deferred.promise;
};
