var nodemon = require('nodemon'),
    q = require('q');

function abToStr(arrayBuffer) {
  return ''+arrayBuffer;
}

module.exports = function initStaticServer(env) {
  return function() {
    var server = nodemon({
      script: 'server.js',
      //We don't want nodemon to watch all js files; whitelist 'server'
      ignore: '*',
      env: env
    });

    return q.when(server.restart.bind(server));
  }
};
