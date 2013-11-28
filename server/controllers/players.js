var jsonController = require('jsonController');

module.exports = function (app) {
    app.get('/api/players/:id?', jsonController.fromFile('data/players.json'));
};