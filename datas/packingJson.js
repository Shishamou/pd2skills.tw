var fs = require('fs');
var naturalSort = require('javascript-natural-sort');

module.exports = packingJson;

function packingJson(base) {
    mergeMode = mergeMode || false;
    var files = fs.readdirSync(base);
    files = files.sort(naturalSort);

    return doPackingJson(files, base);
}

/**
 *
 */
function doPackingJson(files, dirname) {
    var parseArray = files.reduce(function(previous, current, index) {
        return (/^(\d+)\.json$/.test(current))? previous : false;
    }, true);

    if (parseArray) {
        return packingJsonParseArray(files, dirname);
    } else {
        return packingJsonParseObject(files, dirname);
    }
}

/**
 * 給定檔案清單，回傳ㄧ陣列包含文件內容。
 */
function packingJsonParseArray(files, dirname) {
    var match;

    // fetch basename without extension.
    files = files.map(function(file) {
        var match = file.match(/^(\w+)\.json$/);
        return match[1];
    });

    return files.map(function(file) {
        var full = dirname + '/' + file + '.json';
        console.log('Handle: ' + full);

        var json = fs.readFileSync(full, 'utf8');
        return JSON.parse(json);
    });
}

/**
 * 給定檔案清單，回傳ㄧ物件包含文件內容，索引為檔案名稱。
 */
function packingJsonParseObject(files, dirname) {
    var result = {};

    files.forEach(function(file) {
        var full = dirname + '/' + file;

        if (isDir(full)) {
            console.log('Found: ' + full);
            result[toCamelCase(file)] = packingJson(full);
            return;
        }

        if (match = file.match(/^(\w+)\.json$/)) {
            console.log('Handle: ' + full);
            var json = fs.readFileSync(full, 'utf8');
            result[toCamelCase(match[1])] = JSON.parse(json);
        }
    });

    return result;
}

// =============================================================================
// = Other
// =============================================================================

/**
 * 判斷是否為目錄。
 *
 * @param string
 */
function isDir(dir) {
    var stat = fs.statSync(dir);
    return (stat.isDirectory() && ! stat.isFile());
}

/**
 * 轉換為駝峰
 *
 * @param string: Snake case string.
 * @return string
 */
function toCamelCase(string) {
    return string.replace(
        /((?!_)\w)_\w/g,
        function(match) {
            return match.charAt(0) + match.substr(-1).toUpperCase();
        }
    )
}
