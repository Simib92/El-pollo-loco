/**
 * Represents the end screen display for the game.
 * Handles rendering of "Game Over" or "You Won" images.
 */
class EndDisplay extends DrawableObject {
  ENDIMAGE_WON = ["img/You won, you lost/You Won B.png"];

  ENDIMAGE_LOSE = ["img/You won, you lost/Game Over.png"];

  /**
   * Creates a new EndDisplay instance.
   */
  constructor() {
    super();
  }

  /**
   * Displays the "Game Over" image by setting the correct
   * position and size, and loading the image.
   */
  loseAnimation() {
    this.x = 50;
    this.y = 50;
    this.width = 620;
    this.height = 380;
    this.loadImage(this.ENDIMAGE_LOSE);
  }

  /**
   * Displays the "You Won" image by setting the correct
   * position and size, and loading the image.
   */
  winAnimation() {
    this.x = 50;
    this.y = 150;
    this.width = 620;
    this.height = 200;
    this.loadImage(this.ENDIMAGE_WON);
  }
}
