var jsonController = require('jsonController');

module.exports = function (app) {
    app.get('/api/games/:id?', jsonController.fromFile('data/games.json'));
};