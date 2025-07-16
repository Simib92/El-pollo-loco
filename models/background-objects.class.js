/**
 * Represents a background element in the game world.
 * This class is used to create and position background layers for parallax scrolling effects.
 * It inherits from `MovableObject` and sets a default size of 720x480 pixels.
 *
 * @class BackgroundObject
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
/** @type {number} Width of the background image in pixels */
  width = 720;
/** @type {number} Height of the background image in pixels */
  height = 480;

 /**
   * Constructs a new `BackgroundObject`.
   * Loads the image from the given path and sets its horizontal position.
   * The vertical position (`y`) is calculated so the image aligns with the bottom of the canvas (assuming canvas height = 480).
   *
   * @constructor
   * @param {string} imagePath - The file path to the background image.
   * @param {number} x - The horizontal position of the background image.
   *
   * @example
   * const bg = new BackgroundObject('img/background.png', 0);
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
