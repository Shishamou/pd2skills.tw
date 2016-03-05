var fs = require('fs');

var src = __dirname + '/json/icon';
var save = __dirname + '/../dev/json/icon.json';

var files = fs.readdirSync(src);
var result = [], match;
files.forEach(function(file) {
    if (match = file.match(/^(\w+)\.json$/)) {
        var json = fs.readFileSync(src + '/' + file, 'utf8');
        var content = JSON.parse(json);
        content.prefix = match[1];
        result.push(content);
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
