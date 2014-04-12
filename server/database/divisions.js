var Division = require('../models/division');
var collection = new (require('./collection'))('divisions');
var mapper = require('./mapper');
var Q = require("q");

exports.add = function(item){
	var deferred = Q.defer();
	if(!item.validate())
		deferred.reject(new Error('Invalid Division:'+item.getValidationErrors().join('|')));
	else
		collection.insert( item, mapper.mapCallbackToPromise(deferred, Division, true) );
	return deferred.promise;
};

exports.update = function(item){
	var deferred = Q.defer();
	if(!item.validate())
		deferred.reject(new Error('Invalid Division:'+item.getValidationErrors().join('|')));
	else
		collection.update( item, function(err, result) {
			//Update returns a strange object instead of the model object. As a result, we can't
			//use the default mapper
			if (err) deferred.reject(new Error(err));
			else deferred.resolve(item);
		});
	return deferred.promise;
};

exports.getById = function(id){
	var deferred = Q.defer();
	collection.getById( id, mapper.mapCallbackToPromise(deferred, Division, true) );
	return deferred.promise;
};

exports.getAll = function(){
	var deferred = Q.defer();
	collection.getAll( mapper.mapCallbackToPromise(deferred, Division) );
	return deferred.promise;
};
