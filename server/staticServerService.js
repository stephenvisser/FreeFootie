var nodemon = require('nodemon'),
    q = require('q');

function abToStr(arrayBuffer) {
  return ''+arrayBuffer;
}

module.exports = function initStaticServer(env) {
  var deferred = q.defer();

  var reject = function(err){
    deferred.reject(err);
  }

  var server = nodemon({
    script: 'server.js',
    //We don't want nodemon to watch all js files; whitelist 'server'
    ignore: '*',
    env: env
  });

  server.on('stdout', function(out){
    var result = abToStr(out);
    if (result.match('server listening on port')) {
      //Since the 'start' nodemon event isn't emitted when the server STARTS,
      //we use a very fragile listener that depends on stdout format
      deferred.resolve(server);
    }
  });

  server.on('crash', reject);

  server.on('exit', reject);

  return deferred.promise;
};
