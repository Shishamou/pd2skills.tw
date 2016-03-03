import ImageSpriteDrawer from './public/ImageSpriteDrawer';
import IconDrawer from './facades/IconDrawer';

var infamyIcons = [ 'root', 'technician', 'mastermind', 'enforcer', 'ghost', 'xp', 'mask' ];

IconDrawer.registerSprite(
	new ImageSpriteDrawer('res/infamy.png', {size: 128}),
	infamyIcons
);

window.addEventListener('load', () => {
	const root = document.querySelector('#app');

	infamyIcons.forEach((infamy) => {
		var canvas = document.createElement('canvas');

		canvas.addEventListener('mouseenter', function() {
			IconDrawer.draw(infamy, canvas, 'normal');
		});

		canvas.addEventListener('mouseleave', function() {
			IconDrawer.draw(infamy, canvas, 'dark');
		});
		IconDrawer.draw(infamy, canvas, 'dark');

		canvas.style.width = '10%';
		root.appendChild(canvas);
		root.style.background = 'gray';
	})
});
