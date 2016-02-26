
window.addEventListener('load', () => {
	const root = document.querySelector('#app');

	const main = document.createElement('canvas');
	const mainCtx = main.getContext('2d');

	const temp = document.createElement('canvas');
	const tempCtx = temp.getContext('2d');

	var image = new Image;
	image.onload = (e) => {
		var width = image.width;
		var height = image.height;

		temp.width = width;
		temp.height = height;


		var colors = ['#eee', '#607f93', '#383c45', '#bf3247'];
		main.width = width * colors.length;
		main.height = height;

		colors.forEach((color, pos) => {
			tempCtx.clearRect(0, 0, width, height);

			tempCtx.globalCompositeOperation = 'source-over';
			tempCtx.fillStyle = color;
			tempCtx.fillRect(0, 0, width, height);

			tempCtx.globalCompositeOperation = 'destination-in';
			tempCtx.drawImage(image, 0, 0);

			mainCtx.drawImage(temp, width * pos, 0);
		});

		root.appendChild(main);
	};

	image.src = 'res/skills.png';
});
