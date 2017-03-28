const fs = require('fs');
const path = require('path');
const naturalSort = require('javascript-natural-sort');

(function () {
  var workpath = process.argv[2] || '';
  var savename = process.argv[3] || path.join(__dirname, 'packed.json');
  var compress = process.argv[4] || false;
  
  if ( ! isDirectory(workpath)) {
    throw `${workpath} 不是有效路徑`;
  }
  
  var content = packing(workpath);
  content = (compress)
    ? JSON.stringify(content)
    : JSON.stringify(content, null, 2);
  
  fs.writeFile(savename, content, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`檔案已保存在: ${savename}`);
    }
  });
})();


// =============================================================================
// = Func
// =============================================================================

function packing(workpath) {
  var files = fs.readdirSync(workpath);
  files = files.sort(naturalSort);
  
  return files.reduce(function (container, basename) {
    var fullname = path.join(workpath, basename);
    
    if (isDirectory(fullname)) {
      console.log(`處理目錄: ${fullname}`);
      
      var sub = packing(fullname);
      if (Object.keys(sub).length !== 0) {
        container[basename] = sub;
      }
      
      return container;
    }
    
    if (isJson(basename)) {
      console.log(`處理 json 檔案: ${fullname}`);
      
      try {
        var content = fs.readFileSync(fullname, 'utf8');
        content = JSON.parse(content);
        
        merge(container, content);
      } catch (e) {
        throw `無法讀取檔案: ${filename}, ${e}`;
      }
      
      return container;
    }
    
    return container;
  }, {});
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

/**
 * 判斷是否為目錄。
 *
 * @param string
 * @return boolean
 */
function isDirectory(filename) {
  try {
    var stat = fs.statSync(filename);
    return (stat.isDirectory() && ! stat.isFile());
  } catch (exce) {
    if (exce.syscall == 'stat') {
      throw `找不到檔案: ${filename}`;
    }

    throw exce;
  }
}

/**
 * 判斷檔案是否為 JSON。
 *
 * @param string
 * @return boolean
 */
function isJson(filename) {
  return filename.match(/^(\w+)\.json$/);
}
