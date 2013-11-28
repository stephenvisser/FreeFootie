var jsonController = require('jsonController');

module.exports = function (app) {
    app.get('/api/pools/:id?', jsonController.fromFile('data/pools.json'));
};