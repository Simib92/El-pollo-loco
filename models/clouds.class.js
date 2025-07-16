/**
 * Represents a background cloud object in the game.
 *
 * Clouds appear in the background and slowly move to the left to simulate motion.
 */
class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  /**
   * Creates a new Cloud instance at a random horizontal position.
   * Loads the cloud image and initiates leftward movement.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 15000;
    this.animate();
  }

  /**
   * Causes the cloud to move slowly to the left across the screen.
   */
  animate() {
    this.moveLeft();
  }
}
