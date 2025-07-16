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
   * Draws a transparent collision frame around the object for debugging purposes.
   * Sets internal frame properties used for hit detection.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    const types = [
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

    for (const type of types) {
      if (type.classRef.some((cls) => this instanceof cls)) {
        const o = type.offset;
        const fix = type.frameFix || {};

        const frameX = this.x + (fix.x ?? o.x);
        const frameY = this.y + o.y;
        const frameWidth = this.width - (fix.w ?? o.w);
        const frameHeight = this.height - o.h;

        ctx.lineWidth = "10";
        ctx.strokeStyle = "transparent";
        ctx.beginPath();
        ctx.rect(frameX, frameY, frameWidth, frameHeight);
        ctx.stroke();

        this.frameX = frameX;
        this.frameY = frameY;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        break;
      }
    }
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
