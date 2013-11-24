var db = require('./server/db'),
    fs = require('fs');

var sampleData = JSON.parse(fs.readFileSync('sample-data.json'));

console.log('Hit Ctrl-C when complete');
console.log("Still trying to work out why node won't exit on this script.");
console.log("Something to do with dangling event callbacks in mongojs?");
console.log("");
console.log("");

Object.keys(sampleData).map( function (key) {

  var data = sampleData[key];

  console.log(key + ': deleting all data');
  db[key].remove( function(err, rowCount) {
    if (err && err !== null) {
      console.log(key  + ' insert failed');
      console.log(err);
      return;
    } 

    console.log(key + ': deleted ' + rowCount + ' documents');

    console.log(key + ': inserting ' + data.length + ' sample records');
    db[key].insert(data, function(err, saved) {
      if (err && err !== null) {
        console.log(key  + ' insert failed');
        console.log(err);
      } else {
        console.log(key + ': insert complete. ' + saved.length + ' records added');
      }
    });

  });

});
