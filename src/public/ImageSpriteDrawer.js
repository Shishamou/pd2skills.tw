

export default class ImageSpriteDrawer {
  constructor(src, options = {}) {
    this._initial(options);
    this._initialImage(src);
    this.pipe = [];
  }

  _initial(options) {
    this.size = (function(size) {
      if (Array.isArray(size) && size.length == 2)
        return size;
      if (typeof size === 'number')
        return [size, size];
      return null;
    })(options.size || null);

    this.frames = (function(frames) {
      if (Array.isArray(frames) && frames.length == 2)
        return frames;
      if (typeof frames === 'number')
        return [frames, frames];
      return null;
    })(options.frames || null);

    if ( ! (this.size || this.frames))
      throw '必須指定 size 或 frames';
  }

  _initialImage(src) {
    this.image = new Image;
    this.image.src = src;
    this.image.onload = this._imageLoaded.bind(this);
  }

  _imageLoaded(e) {
    var image = this.image;

    if ( ! this.size) {
      this.size = [
        image.width / this.frames[0],
        image.height / this.frames[1]
      ];
    }

    if ( ! this.frames) {
      this.frames = [
        image.width / this.size[0],
        image.height / this.size[1]
      ];
    }

    this.pipe.forEach((event) => event.call(this));
    this.pipe = false;
  }

  // =========================================================================
  // = Draw
  // =========================================================================

  draw(canvas, x, y, color) {
    if (this.pipe) {
      this.pipe.push(() => {this._doDraw(canvas, x, y, color)});
      return;
    }

    this._doDraw(canvas, x, y, color);
  }

  _doDraw(canvas, x, y, color = 'black') {
    x = Math.max(0, Math.min(x, this.frames[0]));
    y = Math.max(0, Math.min(y, this.frames[1]));

    var width = this.size[0];
    var height = this.size[1];

    if (canvas.width !== width)
      canvas.width = width;
    if (canvas.height !== height)
      canvas.height = height;

    this._drawImage(canvas, -(width * x), -(height * y), color);
  }

  _drawImage(canvas, x, y, color) {
    var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(this.image, x, y);
  }

  // =========================================================================
  // = Target
  // =========================================================================

  target(canvas) {
    var pos = [0, 0];

    var app = {
      pos: (x, y) => {
        pos = [x, y]
        return app;
      },
      draw: (color) => {
        this.draw(canvas, pos[0], pos[1], color);
        return app;
      }
    }

    return app;
  }
}
