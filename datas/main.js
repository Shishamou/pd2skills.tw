var fs = require('fs');
var naturalSort = require('javascript-natural-sort');
var packing = require('packing');

var result = ((base) => {
	var files = fs.readdirSync(base);
	files = files.sort(naturalSort);

	return files.reduce(function(container, filename, index) {
		var fullname = base + '/' + filename;
		if (isDirectory(fullname)) {
			container[fullname] = packing(fullname);
		}

		return container;
	}, new Object);
})(__dirname);

result = JSON.stringify(result, null, 4);
