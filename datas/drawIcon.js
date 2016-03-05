var fs = require('fs');
var Canvas = require('canvas');
var Image = Canvas.Image;

module.exports = function drawIcon(alpha, output) {
	var colors = ['#eee', '#607f93', '#383c45', '#bf3247'];
	fs.readFile(alpha, function (err, src) {
		if (err) throw err;

		var image = new Image;
		image.src = src;

		var width = image.width;
		var height = image.height;

		var main = new Canvas(width * colors.length, height);
		var mainCtx = main.getContext('2d');

		var temp = new Canvas(width, height);
		var tempCtx = temp.getContext('2d');

		colors.forEach(function (color, pos) {
			tempCtx.clearRect(0, 0, width, height);

			tempCtx.globalCompositeOperation = 'source-over';
			tempCtx.fillStyle = color;
			tempCtx.fillRect(0, 0, width, height);

			tempCtx.globalCompositeOperation = 'destination-in';
			tempCtx.drawImage(image, 0, 0);

			mainCtx.drawImage(temp, width * pos, 0);
		});

		canvasSaveToPng(main, output);
	});

	function canvasSaveToPng(canvas, output) {
		output = fs.createWriteStream(output);
		var stream = canvas.pngStream();

		stream.on('data', function(chunk) {
			output.write(chunk);
		});

		stream.on('end', function() {
			console.log('saved png');
		});
	}
}
