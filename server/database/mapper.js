
exports.mapCallbackToPromise = function(deferred, mappedType, firstResult){
	return function(err, result){
		if(err)
			deferred.reject(new Error(err));
		else if(result instanceof Array)
			if (firstResult) {
				deferred.resolve(new mappedType(result[0]));
			} else {
				deferred.resolve(result.map(function(item){
					return new mappedType(item);
				}));
			}
		else
			deferred.resolve(new mappedType(result));
	};
};
