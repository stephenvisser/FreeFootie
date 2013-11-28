var jsonController = require('jsonController');

module.exports = function (app) {
    app.get('/api/locations/:id?', jsonController.fromFile('data/locations.json'));
};