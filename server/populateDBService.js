var mongodb = require("mongojs"),
    fs = require('fs'),
    q = require('q'),
    models = {
      Game: require('./models/game'),
      Team: require('./models/team'),
      Player: require('./models/player'),
      Location: require('./models/location'),
      Division: require('./models/division')
    };

module.exports = function(url, datafile) {
  var db = mongodb.connect(url, ["Game", "Location", "Player", "Division", "Team"]),
      sampleData = JSON.parse(fs.readFileSync(datafile));

  return q.all(Object.keys(sampleData).map(function (key) {

    var data = sampleData[key].map(function(item){
      return new models[key](item);
    }),
        deferred = q.defer();

    db[key].remove( function(err, rowCount) {
      if (err) {
        deferred.reject(err);
      }

      db[key].insert(data, function(err, saved) {
        if (err) {
          deferred.reject(err);
        } else {
          console.log(key + ': insert complete. ' + saved.length + ' records added');
          deferred.resolve();
        }
      });
    });
    return deferred.promise;
  }))

  .finally(function(){
    db.close();
  });
};
