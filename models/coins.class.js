/**
 * Represents a collectible coin object in the game.
 *
 * Coins can be collected by the player and are animated with rotating images.
 */
class Coin extends DrawableObject {
  height = 120;
  width = 120;
  y = 330;
  type = "coin";

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new Coin instance at a randomized position.
   * Loads the coin images and starts the animation loop.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = 200 + Math.random() * 15000;
    this.y = 330 + Math.random() * -300;
    setStoppableInterval(() => this.animate(), 500);
  }

  /**
   * Handles animation by cycling through the coin image frames.
   */
  animate() {
    this.playAnimation(this.IMAGES_COIN);
  }
}
