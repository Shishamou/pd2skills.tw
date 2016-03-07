var fs = require('fs');
var naturalSort = require('javascript-natural-sort');

module.exports = packing;

/**
 * 合併目錄內 *.json 為單一檔案。
 *
 * @param string
 */
function packing(base) {
    var files = fs.readdirSync(base);
    files = files.sort(naturalSort);

    return files.reduce(function(container, filename, index) {
        var fullname = base + '/' + filename;
        var content;

        if (isDirectory(fullname)) {
            content = {};
            content[filename] = packing(fullname);
        } else if (filename.match(/^(\w+)\.json$/)) {
            content = readJsonFile(fullname);
        }

        merge(container, content);
        return container;
    }, new Object);
}

/**
 * 判斷是否為目錄。
 *
 * @param string
 * @return boolean
 */
function isDirectory(dir) {
    var stat = fs.statSync(dir);
    return (stat.isDirectory() && ! stat.isFile());
}

/**
 * 讀取 JSON 檔案。
 *
 * @param string
 * @return object
 */
function readJsonFile(filename) {
    try {
        var content = fs.readFileSync(filename, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        throw '讀取檔案失敗: ' + filename + ', ' + e;
    }
}

/**
 * 深合併兩個物件。
 *
 * @param object
 * @param object
 * @return object
 */
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
    }

    return object1;
}
