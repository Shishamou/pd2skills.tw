var drawIcon = require('./drawIcon');

fs.readdir(__dirname, function(err, files) {
    if (err) return;
    files.forEach(function(f) {
        console.log('Files: ' + f);
    });
});

['skills', 'perks', 'infamy'].forEach(function(name) {
	drawIcon(
		__dirname + '/alpha/' + name + '.png',
		__dirname + '/' + name + '.png'
	);
	console.log('save: ' + name);
});
