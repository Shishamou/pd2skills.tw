var fs = require('fs');
var naturalSort = require('javascript-natural-sort');

module.exports = (function(base) {
  var files = fs.readdirSync(base);
  files = files.sort(naturalSort);

  return files.reduce(function(container, filename, index) {
    if (filename.match(/^(\w+)\.json$/)) {
      var full = base + '/' + filename;

      var content = fs.readFileSync(full, 'utf8');
      content = JSON.parse(content);

      container.push(content);
    }

    return container;
  }, []);
})(__dirname + '/datas');
