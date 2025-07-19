/**
 * Base class for all drawable objects in the game.
 * Handles image loading, rendering, animation, and collision frame setup.
 */
class DrawableObject {
  height = 160;
  width = 120;
  x = 100;
  y = 290;
  img;
  imageCache = {};
  currentImage = 0;
  frameX;
  frameY;
  frameWidth;
  frameHeight;
  drawIntervalID = [];

  /**
   * Loads a single image from a given path and sets it as the object's image.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   * Supports horizontal flipping for mirrored rendering.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {boolean} [flipped=false] - Whether to draw the image flipped horizontally.
   */
  draw(ctx, flipped = false) {
    ctx.save();
    if (flipped) {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    } else {
      ctx.translate(this.x, this.y);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    }
    ctx.restore();
  }

  /**
   * Draws a debug frame around the current game object, depending on its type.
   * The frame dimensions are calculated with specific offsets and corrections.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawFrame(ctx) {
    const types = this.getFrameTypes();

    for (const type of types) {
      if (this.isInstanceOf(type.classRef)) {
        this.applyFrame(ctx, type.offset, type.frameFix || {});
        break;
      }
    }
  }

  /**
   * Returns a list of game object types with corresponding frame offsets and corrections.
   * These are used to calculate the bounding boxes for the debug frames.
   * @returns {Array<Object>} List of frame configuration objects.
   */
  getFrameTypes() {
    return [
      {
        classRef: [Chicken, ThrowableObject],
        offset: { x: 10, y: 0, w: 20, h: 20 },
      },
      { classRef: [SmallChicken], offset: { x: 5, y: -8, w: 10, h: 0 } },
      {
        classRef: [Endboss],
        offset: { x: 50, y: 80, w: 60, h: 90 },
        frameFix: { x: 45, w: 40 },
      },
      {
        classRef: [Character],
        offset: { x: 20, y: 110, w: 50, h: 110 },
        frameFix: { w: 40 },
      },
      { classRef: [Coin], offset: { x: 40, y: 40, w: 80, h: 80 } },
      { classRef: [Bottle], offset: { x: 20, y: 20, w: 40, h: 40 } },
    ];
  }

  /**
   * Checks whether the current object is an instance of any class in the provided list.
   * @param {Array<Function>} classList - List of class constructors to check against.
   * @returns {boolean} True if the object is an instance of one of the classes.
   */
  isInstanceOf(classList) {
    return classList.some((cls) => this instanceof cls);
  }

  /**
   * Calculates and draws the debug frame rectangle for the object on the canvas.
   * Also stores the resulting frame dimensions in instance properties.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {{x: number, y: number, w: number, h: number}} offset - Default frame offset and size.
   * @param {{x?: number, w?: number}} frameFix - Optional overrides for offset values.
   */
  applyFrame(ctx, offset, frameFix) {
    const x = this.x + (frameFix.x ?? offset.x);
    const y = this.y + offset.y;
    const w = this.width - (frameFix.w ?? offset.w);
    const h = this.height - offset.h;
    ctx.lineWidth = "10";
    ctx.strokeStyle = "transparent";
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    this.frameX = x;
    this.frameY = y;
    this.frameWidth = w;
    this.frameHeight = h;
  }

  /**
   * Preloads a list of images and stores them in the image cache.
   * @param {string[]} arr - Array of image path strings.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Cycles through a list of images to play an animation.
   * @param {string[]} images - Array of image path strings for animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
