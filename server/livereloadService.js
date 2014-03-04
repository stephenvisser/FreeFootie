var livereload = require('gulp-livereload'),
    q = require('q');

module.exports = function(port) {

  var server = livereload(port),
      deferred = q.defer();

  function notify(file) {
    server.changed(file.path);
  }

  function reject(err) {
    deferred.reject(err);
  }

  var portNum = Object.keys(livereload.servers)[0]
  livereload.servers[portNum].server.on('listening', function(){
    //The livereload server is up and running, we can watch for changes
    deferred.resolve(notify);
  })
  .on('close', reject)
  .on('error', reject);

  return deferred.promise;
};
