'use strict'

var fs = require('fs');

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
  return data;
};

var getById = function (array, id) {

  var a = array.filter(function(elem) {
    return elem.id == id;
  });

  if (a.length > 0)
    return a[0];
  return {};
};

module.exports = {
  fromFile: function (path) {
    return function (req, res){
      var id = parseInt( req.params.id );
      var data = JSON.parse(fs.readFileSync(path));

      if (id) {
        res.send(transform(getById(data, id)));
      } else {
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
      }
    };
  }
};
