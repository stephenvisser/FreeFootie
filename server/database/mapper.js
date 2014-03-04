
exports.mapCallbackToPromise = function(deferred, mappedType){
	return function(err, result){
		if(err)
			deferred.reject(new Error(err));
		else if(result instanceof Array)
			deferred.resolve(result.map(function(item){
				return new mappedType(item);
			}));
		else
			deferred.resolve(new mappedType(result));
	};
};