'use strict'

var db = require('./db'),
 games = require('./api/games'),
 locations = require('./api/locations'),
 players = require('./api/players'),
 pools = require('./api/pools'),
 teams = require('./api/teams');


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


exports.configureRoutes = function(app){
    app.get('/api/games/:id?', games.get);
    app.get('/api/locations/:id?', locations.get);
    app.get('/api/pools/:id?', pools.get);
    app.get('/api/teams/:id?', teams.get);
    app.get('/api/players/:id?', players.get);
};

