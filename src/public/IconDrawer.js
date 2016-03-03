import ImageSpriteDrawer from './ImageSpriteDrawer';

export default class IconDrawer {
	constructor() {
		this.iconIndexes = {};
		this.sprites = [];

		this.colors = {
			normal: '#eee',
			alert: '#bf3247',
			gray: '#607f93',
			dark: '#383c45',
			strong: '#3aa5e6',
		}
	}

	registerSprite(sprite, frameNames) {
		if ( ! (sprite instanceof ImageSpriteDrawer))
			throw 'Arg1 must instance of ImageSpriteDrawer.';
		if ( ! Array.isArray(frameNames))
			throw 'Arg2 must be an array.';

		var spriteId = this.sprites.push(sprite) - 1;
		frameNames.forEach((frameName, frame) => {
			this.iconIndexes[frameName] = { frame, spriteId };
		})
	}

	draw(iconName, canvas, color = 'normal') {
		if (typeof this.iconIndexes[iconName] === 'undefined')
			throw `Cannot find icon named ${iconName}`;

		var icon = this.iconIndexes[iconName];
		var sprite = this.sprites[icon.spriteId];
		this.colors[color] && (color = this.colors[color]);

		var frameNo = icon.frame;
		var x = frameNo % sprite.frames[0];
		var y = Math.floor(frameNo / sprite.frames[1]);

		sprite.draw(canvas, x, y, color);
	}
}
