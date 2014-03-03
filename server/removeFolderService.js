var q = require('q'),
    rm = require('rimraf');

module.exports = function(folder) {
  var later = q.defer();
  rm(folder, function(err){
    if (err) {
      later.reject(err);
    } else {
      later.resolve();
    }
  });
  return later.promise;
};
