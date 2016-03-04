var fs = require('fs');

var src = __dirname + '/json/icon';
var save = __dirname + '/../dev/icon.json';

var files = fs.readdirSync(src);
var result = [];
files.forEach(function(file) {
    if (file.match(/^(\w+)\.json$/)) {
        file = fs.readFileSync(src + '/' + file, 'utf8');
        result.push(JSON.parse(file));
    }
});
result = JSON.stringify(result, null, 4);

fs.writeFile(save, result, function(err) {
    if (err) {
        throw err;
    } else {
        console.log('Save at : ' + save);
    }
});
