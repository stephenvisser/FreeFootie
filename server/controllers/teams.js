var jsonController = require('jsonController');

module.exports = function (app) {
    app.get('/api/teams/:id?', jsonController.fromFile('data/teams.json'));
};