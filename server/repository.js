'use strict'

if (!process.env.MONGO_URL) {
  console.error('Need to set mongo URL environment variable (run with gulp)');
  process.exit(0);
}

var mongodb = require("mongojs"),
    db = mongodb.connect(process.env.MONGO_URL, ["games", "locations", "players", "pools", "teams"]);

var transform = function(data) {
    for (var property in data) {
        if (data[property] && data[property].match) {
            var r = data[property].match(/<<now(?:~(\d)h)?>>/);
            if (r) {
                var time = new Date(),
                    diff = r[1] | 0,
                         hourOffset = Math.floor((Math.random() - 0.5) * 2 * diff),
                         newTime = time.getTime() + hourOffset * 3600000;
                console.log ("SSSSSSS", new Date(newTime));
                data[property] = new Date(newTime).toISOString();
            }
        }
    }

    data.id = data._id;
    delete data._id;

    return data;
};

var dataSaver = function (collection) {
    return function (req, res){
      db[collection].save(req.body, function (err, data) {
        console.log(err, 'saved a thingy, bitches');
      });
    };
};

var dataLoader = function (collection) {
    return function (req, res){
        var id = req.params.id;

        if (id) {
          db[collection].findOne( {"_id" : id}, function (err, data) {
             res.send(
                 transform(data)
             );
          });
        } else {
          db[collection].find( {}, function (err, data) {
            res.send(
                data.map(transform).filter(function(item){
                    return Object.keys(req.params).every(function(prop){
                        if (prop === 'id') return true;
                        if (prop === 'date') {
                            var pDate = new Date(content.parameters[prop]),
                                oDate = new Date(item[prop]),
                                year = pDate.getYear(),
                                month = pDate.getMonth(),
                                date = pDate.getDate();
                            return oDate.getYear() === pDate.getYear() && oDate.getMonth() === pDate.getMonth() && oDate.getDate() === pDate.getDate();
                        }
                    });
                }));
          });
        }
    };
};

module.exports = {
  persist: dataSaver,
  fetch: dataLoader
};
