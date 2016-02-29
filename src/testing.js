import ImageSpriteDrawer from './public/ImageSpriteDrawer';


window.addEventListener('load', () => {
	const root = document.querySelector('#app');

	var drawer = new ImageSpriteDrawer('res/skills.png', {size: 64});

	for (var i = 0; i < 25; i++) {
		var canvas = document.createElement('canvas');
		var x = i % 8;
		var y = Math.floor(i / 8);

		let iconDrawer = drawer.target(canvas).pos(x, y);

		canvas.addEventListener('mouseenter', function() {
			iconDrawer.draw('red');
		});

		canvas.addEventListener('mouseleave', function() {
			iconDrawer.draw('black');
		});
		iconDrawer.draw('black');

		canvas.style.width = '10%';
		root.appendChild(canvas);
		root.style.background = 'gray';
	}
});
