var fs = require('fs');
var packingJson = require('./packingJson');

var src = __dirname + '/perks/datas';
var save = __dirname + '/../dev/json/perks.json';

var result = JSON.stringify(packingJson(src), null, 4);

fs.writeFile(save, result, function(err) {
    if (err) {
        throw err;
    } else {
        console.log('Save at : ' + save);
    }
});
