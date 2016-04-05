var fs = require('fs');
var packingDatasMain = require('./helper');

var result = packingDatasMain(__dirname);

var saveName = process.argv[2] || '';
if (saveName) {
	saveName = __dirname + '/' + saveName;
	fs.writeFile(saveName, JSON.stringify(result, null, 4), function(err) {
		console.log('檔案已保存在路徑: ' + saveName);
	});
}
