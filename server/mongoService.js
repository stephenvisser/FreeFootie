var spawn = require('child_process').spawn,
    q = require('q');

module.exports = function mongoService() {
  var mongod = spawn('mongod'),
      deferred = q.defer();

  mongod.stdout.on('data', function (data) {
    if ((''+data).match('waiting for connections')) {
      console.log('Mongo Daemon started'.green);
      deferred.resolve(mongod);
    }
  });

  mongod.stderr.on('data', function (data) {
    console.log('[' + 'mongo'.red + '] '+data);
  });

  mongod.on('exit', function(code){
    deferred.reject('Exited with code ' + code);
  });

  return deferred.promise;
};
