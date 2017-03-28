var fs = require('fs');
var naturalSort = require('javascript-natural-sort');

module.exports = packingDatasMain;

/**
 * 搜尋路徑下的目錄, 並進行打包
 *
 * @param string 路徑
 * @return object 物件鍵值為目錄名稱
 */
function packingDatasMain(base) {
  var files = fs.readdirSync(base);
  files = files.sort(naturalSort);

  return files.reduce(function(container, filename, index) {
    var fullname = base + '/' + filename;

    // 若為目錄則呼叫 packingDatasDirectory 進行打包處理
    if (isDirectory(fullname)) {
      console.log('處理目錄: ' + fullname);
      var result = packingDatasDirectory(fullname);
      if (result) {
        container[filename] = result;
      }
    }

    return container;
  }, new Object);
}

/**
 * 打包目錄下的所有 json,
 * 若目錄下有 main.js 則呼叫處理,
 * 反之使用預設 packingJson 進行處理
 *
 * @param string 目錄路徑
 * @return object
 */
function packingDatasDirectory(directoryPath) {
  try {
    var userScriptPath = directoryPath + '/main.js';

    if (fs.statSync(userScriptPath).isFile()) {
      console.log('呼叫自定義腳本: ' + userScriptPath);
      return require(userScriptPath);
    }
  } catch (exce) {
    if (exce.syscall == 'stat') {
      // 未設置自定義腳本, 使用預設方法處理
      return packingJson(directoryPath + '/datas');
    }

    console.log('呼叫腳本失敗');
    throw exce;
  }
}

/**
 * 合併目錄內 *.json 為單一檔案
 * 遇到子目錄則遞迴處理
 *
 * @param string
 * @return object
 */
function packingJson(base) {
  var files = fs.readdirSync(base);
  files = files.sort(naturalSort);

  return files.reduce(function(container, filename) {
    var fullname = base + '/' + filename;

    if (isDirectory(fullname)) {
      var content = {};
      content[filename] = packingJson(fullname);

      merge(container, content);
      return container;
    }

    if (filename.match(/^(\w+)\.json$/)) {
      console.log('處理 json: ' + fullname);
      merge(container, readJsonFile(fullname));
    }

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