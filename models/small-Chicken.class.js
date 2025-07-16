/**
 * Represents a small chicken enemy in the game.
 * Extends MovableObject with specific animations and behavior.
 */
class SmallChicken extends MovableObject {
  energy = 100;
  type = "normal";

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a SmallChicken instance with randomized position and speed.
   * Loads walking and dead animations.
   *
   * @param {number} height - Height of the chicken sprite
   * @param {number} width - Width of the chicken sprite
   * @param {number} y - Vertical position of the chicken
   */
  constructor(height, width, y) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = y;
    this.height = height;
    this.width = width;
    this.x = 400 + Math.random() * 16000;
    this.speed = 0.15 + Math.random() * 0.5;
    setStoppableInterval(() => this.animateWalk(), 1000 / 60);
    setStoppableInterval(() => this.animateImg(), 200);
  }

  /**
   * Moves the chicken to the left if it is alive (energy > 1).
   */
  animateWalk() {
    if (this.energy > 1) this.moveLeft();
  }

  /**
   * Plays the walking animation if alive, otherwise plays the dead animation.
   */
  animateImg() {
    if (this.energy > 1) this.playAnimation(this.IMAGES_WALKING);
    else this.playAnimation(this.IMAGES_DEAD);
  }
}
