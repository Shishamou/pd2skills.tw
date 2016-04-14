var fs = require('fs');
var packingDatasMain = require('./helper');

var result = packingDatasMain(__dirname);

var saveName = process.argv[2] || '';
var prettyPrint = process.argv[3] || false;

if (saveName) {
	saveName = __dirname + '/' + saveName;
	var content = (prettyPrint)
		? JSON.stringify(result, null, 4)
		: JSON.stringify(result);
	fs.writeFile(saveName, content, function(err) {
		console.log('檔案已保存在路徑: ' + saveName);
	});
}
