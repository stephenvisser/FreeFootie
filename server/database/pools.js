var Pool = require('../models/pool');
var collection = require('./collection')('pools', Pool);
var mapper = require('./mapper');
var Q = require("q");

exports.add = function(item){
	var deferred = Q.defer();
	collection.insert( item, mapper.mapCallbackToPromise(deferred) );
	return deferred.promise;
};

exports.update = function(item){
	var deferred = Q.defer();
	collection.update( item, mapper.mapCallbackToPromise(deferred) );
	return deferred.promise;
};

exports.getById = function(id){
	var deferred = Q.defer();
	collection.getById( id, mapper.mapCallbackToPromise(deferred) );
	return deferred.promise;
};

exports.getAll = function(){
	var deferred = Q.defer();
	collection.find( mapper.mapCallbackToPromise(deferred) );
	return deferred.promise;
};
