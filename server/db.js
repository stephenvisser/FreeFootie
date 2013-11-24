var databaseURI = process.env.MONGO_URL || "localhost:27017/freefootie";
var collections = ["games", "locations", "players", "pools", "teams"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;
