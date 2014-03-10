var spawn = require('child_process').spawn,
    q = require('q');

module.exports = function mongoService() {
  var mongod = spawn('mongod'),
      excRegExp = /exception/;

  mongod.stdout.on('data', function (data) {
    (''+data)
    .split('\n')
    .forEach(function(line){
      if (line) {
        if (excRegExp.test(line)) {
          console.log('[' + 'mongo'.red + '] '+ line);
        } else {
          console.log('[' + 'mongo'.green + '] '+ line);
        }
      }
    })
  });

  return q.when(mongod);
};
