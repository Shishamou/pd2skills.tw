var fs = require('fs');
var naturalSort = require('javascript-natural-sort');

// read directory
var __base = __dirname + '/datas';
var files = fs.readdirSync(__base);
files = files.sort(naturalSort);

var result = files.reduce(function(container, filename, index) {
    if (filename.match(/^(\w+)\.json$/)) {
        var full = __base + '/' + filename;

        var content = fs.readFileSync(full, 'utf8');
        content = JSON.parse(content);

        merge(container, content);
    }

    return container;
}, new Object);

result = JSON.stringify(result, null, 4);
console.log(result);


// =============================================================================
// = Func
// =============================================================================

function merge(object1, object2) {
    for (var key in object2) {
        if (object1[key] instanceof Array && object1[key] instanceof Array) {
            object1[key] = Array.prototype.concat(object1[key], object2[key]);
            continue;
        }

        if (object1[key] instanceof Object && object2[key] instanceof Object) {
            merge(object1[key], object2[key]);
            continue;
        }

        object1[key] = object2[key];
    };

    return object1;
}
